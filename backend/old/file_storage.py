import os

def save_uploaded_file(file, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as buffer:
        buffer.write(file)