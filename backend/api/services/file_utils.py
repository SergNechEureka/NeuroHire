import os
import shutil
import uuid
from sqlmodel import Session
from datetime import datetime

class TempFile:
    temp_dir = "/tmp/neurohire"
    full_path: str = ""

    def __init__(self, file) -> None:
        self.file = file
        pass

    def save_file(self) -> str:
        os.makedirs(TempFile.temp_dir, exist_ok=True)
        self.file.file.seek(0, 2)  # Перейти в конец файла
        file_size = self.file.file.tell()
        self.file.file.seek(0)  # Вернуться в начало
        if file_size > 500 * 1024:
            raise ValueError("File size exceeds 500 KB limit.")
        self.full_path = os.path.join(TempFile.temp_dir, f"{uuid.uuid4()}.{self.get_file_type()}")
        with open(self.full_path, "wb") as out_file:
            shutil.copyfileobj(self.file.file, out_file)
        return self.full_path

    def remove_file(self):
        if os.path.exists(self.full_path):
            os.remove(self.full_path)

    def get_full_path(self):
        return self.full_path

    def get_file_name(self):
        return self.file.filename

    def get_file_type(self):
        return self.file.filename.split('.')[-1].lower()

    def get_file_size(self):
        return self.file.size

    def extract_file_metadata(self):
        return {
            "filename": self.file.filename,
            "filetype": self.get_file_type(),
            "filesize": self.get_file_size(),
            "uploaded_at": datetime.utcnow()
        }