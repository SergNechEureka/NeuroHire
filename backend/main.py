from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from services.chatgpt import ask_chatgpt
import shutil
import os
from services import parser

# Создаём экземпляр приложения
app = FastAPI()

# Простейший маршрут GET /
@app.get("/")
def read_root():
    return {"message": "Добро пожаловать в API NeuroHire!"}

# Проверочный маршрут GET /ping
@app.get("/ping")
def ping():
    return {"status": "ok"}

class AskRequest(BaseModel):
    question: str

@app.post("/ask")
def ask(request: AskRequest):
    answer = ask_chatgpt(request.question)
    return {"answer": answer}

@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()
    temp_path = f"temp.{file_ext}"

    # Сохраняем файл во временный путь
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Обработка по типу
    if file_ext == "pdf":
        text = parser.extract_text_from_pdf(temp_path)
    elif file_ext == "docx":
        text = parser.extract_text_from_docx(temp_path)
    else:
        os.remove(temp_path)
        return {"error": "Поддерживаются только PDF и DOCX"}

    os.remove(temp_path)
    return {"filename": file.filename, "text_snippet": text[:500]}