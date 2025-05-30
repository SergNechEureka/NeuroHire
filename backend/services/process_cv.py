import uuid
import threading

from ..db import SessionLocal
from ..routes.upload_status import set_status
from ..routes.upload import BackgroundTasks
from .background_pool import file_processing_semaphore
from ..agents.cv_agent import CVProcessingAgent
from .file_utils import TempFile  


class CVFileProcessor:
    def __init__(self, file: TempFile):
        self.file = file

    def start_job(self, background_tasks: BackgroundTasks):
        """
        Starts background jobs for each file and returns job_ids for tracking.
        """
        job_id = str(uuid.uuid4())

        set_status(job_id, "Starting", 0)
        set_status(job_id, "Uploading file", 10)

        set_status(job_id, f"Saving file ({self.file.get_file_name()})", 20)
        self.file.save_file()

        thread = threading.Thread(target=self.process_file_job, args=(job_id,))
        
        thread.start()

        return job_id

    def process_file_job(self, job_id: str):
        """
        Full processing pipeline for a single CV file.
        Uses a separate DB session for thread safety.
        Updates job status after each stage.
        """
        session = SessionLocal()

        try:
            cv_processing_agent = CVProcessingAgent()
            cv_processing_agent.process(self.file, job_id)

            self.file.remove_file()

        except Exception as e:
            set_status(job_id, f"Error: {str(e)}", -1)
            self.file.remove_file()
            print(f"Error:{e}")
        finally:
            session.close()
            file_processing_semaphore.release()