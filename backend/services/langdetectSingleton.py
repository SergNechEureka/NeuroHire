import threading
from langdetect import DetectorFactory, detect, LangDetectException

class LangDetectSingleton:
    _instance = None
    _lock = threading.Lock()
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(LangDetectSingleton, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        with self._lock:
            if not self._initialized:
                DetectorFactory.seed = 0  # For reproducibility
                LangDetectSingleton._initialized = True

    _detect_lock = threading.Lock()

    def detect(self, text):
        try:
            with self._detect_lock:
                return detect(text)
        except LangDetectException as e:
            return "unknown"