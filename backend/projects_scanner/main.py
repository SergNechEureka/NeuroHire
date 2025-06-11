from ProjectsScanner import ProjectsScanner

import threading
import signal
import sys

def main():
    scanner = ProjectsScanner()
    thread = threading.Thread(target=scanner.run)
    thread.start()

    def handle_exit(signum, frame):
        scanner.stop()
        thread.join()
        sys.exit(0)

    signal.signal(signal.SIGINT, handle_exit)
    signal.signal(signal.SIGTERM, handle_exit)

    thread.join()

if __name__ == "__main__":
    main()