# 1. Используем официальный Python-образ (выбери подходящую версию)
FROM python:3.13-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]