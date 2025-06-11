#!/bin/sh
set -e

if [ "$MODE" = "SCANNER" ]; then
    exec python worker.py
elif [ "$MODE" = "API" ]; then
    exec uvicorn main:app --host 0.0.0.0 --port 5050
else
    echo "Unknown MODE: $MODE. Please set MODE to either 'SCANNER' or 'API'."
fi