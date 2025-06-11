FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y pandoc

COPY . /app

RUN cd ..
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]