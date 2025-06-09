import uuid
import threading
import traceback
import gc
import psutil
import os
import logging
import queue
import time
from typing import List, Dict

from ..db import SessionLocal
from ..routes.upload_status import set_status
from ..routes.upload import BackgroundTasks
from .file_utils import TempFile  
from ..agents.cv_agent import CVProcessingAgent

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def log_memory_usage():
    """Log current memory usage of the process"""
    process = psutil.Process(os.getpid())
    memory_info = process.memory_info()
    logger.info(f"Memory usage: {memory_info.rss / 1024 / 1024:.2f} MB")

class CVFileProcessor:
    # Static class variables for queue and thread management
    _file_queue = queue.Queue()
    _active_threads: Dict[str, threading.Thread] = {}
    _threads_lock = threading.Lock()

    def __init__(self, file: TempFile):
        self.file = file

    @classmethod
    def _process_next_file(cls):
        """Attempts to process the next file from the queue"""
        try:
            if not cls._file_queue.empty():
                file, job_id = cls._file_queue.get()
                try:
                    thread = threading.Thread(target=cls._process_file_job, args=(file, job_id))
                    with cls._threads_lock:
                        cls._active_threads[job_id] = thread
                    thread.start()
                    logger.info(f"Started processing file {file.get_file_name()} with job_id {job_id}")
                except RuntimeError as e:
                    if "can't start new thread" in str(e):
                        set_status(job_id, "Waiting to be processed", 25)

                        logger.warning("Cannot start new thread, putting file back in queue")
                        cls._file_queue.put((file, job_id))
                        # Schedule retry after 10 seconds
                        threading.Timer(10.0, cls._process_next_file).start()
                    else:
                        raise
        except Exception as e:
            logger.error(f"Error in process_next_file: {e}")
            logger.error(traceback.format_exc())

    @classmethod
    def _process_file_job(cls, file: TempFile, job_id: str):
        """Process a single file"""
        session = SessionLocal()
        log_memory_usage()

        try:
            cv_processing_agent = CVProcessingAgent()
            cv_processing_agent.process(file, job_id)
            log_memory_usage()

        except Exception as e:
            logger.error(f"Error processing file: {e}")
            logger.error(traceback.format_exc())
            set_status(job_id, f"Error: {str(e)}", -1)

        finally:
            try:
                file.remove_file()
            except Exception as file_err:
                logger.warning(f"Failed to remove temp file: {file_err}")
            
            cv_processing_agent = None
            gc.collect()
            
            session.close()
            
            with cls._threads_lock:
                if job_id in cls._active_threads:
                    del cls._active_threads[job_id]
            
            log_memory_usage()
            
            # Try to process next file
            cls._process_next_file()

    def start_job(self, background_tasks: BackgroundTasks):
        """
        Adds file to processing queue and returns job_id
        """
        job_id = str(uuid.uuid4())

        set_status(job_id, "Starting", 0)
        set_status(job_id, "Uploading file", 10)

        set_status(job_id, f"Saving file ({self.file.get_file_name()})", 20)
        self.file.save_file()

        # Add file to queue
        self._file_queue.put((self.file, job_id))
        
        # Try to start processing
        self._process_next_file()

        return job_id