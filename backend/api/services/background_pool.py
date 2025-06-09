import threading

# Semaphore for limiting parallel processing
file_processing_semaphore = threading.Semaphore(10)