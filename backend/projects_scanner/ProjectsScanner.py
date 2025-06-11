import time
import threading
import yaml
import os
from common_components.MailClient.MailClient import MailClient

class ProjectsScanner:
    def __init__(self):
        self.load_config()
        self.mail_client = MailClient()
        self.stop_event = threading.Event()

    def load_config(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(base_dir, "config.yaml")

        with open(path, "r") as f:
            config = yaml.safe_load(f)

        self.check_interval_seconds = config.get("check_interval_seconds", 300) 

    def check_mail(self):
        messages = self.mail_client.fetch_unseen()
        for msg in messages:
            self.handle_message(msg)

    def handle_message(self, msg):

        pass

    def run(self):
        while not self.stop_event.is_set():
            self.check_mail()
            for _ in range(self.check_interval_seconds):
                if self.stop_event.is_set():
                    break
                time.sleep(1)

    def stop(self):
        self.stop_event.set()