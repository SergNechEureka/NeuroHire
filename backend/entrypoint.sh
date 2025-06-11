#!/bin/sh
set -e

if [ "$MODE" = "worker" ]; then
    exec python worker.py
else
    exec uvicorn main:app --host 0.0.0.0 --port 5050
fi