import os
import imaplib
import email
from email.header import decode_header
from email.utils import parseaddr
from email import utils
from datetime import datetime

class MailClient:
    def __init__(self, imap_server='imap.titan.email', imap_port=993):
        self.email_address = os.getenv("EMAIL_ADDRESS")
        self.password = os.getenv("EMAIL_PASSWORD")
        self.imap_server = imap_server
        self.imap_port = imap_port
        self.conn = None

    def login(self):
        if not self.email_address or not self.password:
            raise ValueError("EMAIL_ADDRESS and EMAIL_PASSWORD environment variables must be set")
        
        self.conn = imaplib.IMAP4_SSL(self.imap_server, self.imap_port)
        self.conn.login(self.email_address, self.password)

    def logout(self):
        if self.conn:
            self.conn.logout()
            self.conn = None

    def _decode_subject(self, subject_header):
        subject, encoding = decode_header(subject_header)[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8", errors="replace")
        return subject

    def _extract_date(self, msg):
        date_tuple = utils.parsedate_tz(msg["Date"])
        if date_tuple:
            dt = datetime.fromtimestamp(utils.mktime_tz(date_tuple))
            return dt.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return msg["Date"]

    def _extract_plain_text(self, msg):
        text = ""
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))
                if content_type == "text/plain" and "attachment" not in content_disposition:
                    charset = part.get_content_charset() or "utf-8"
                    payload = part.get_payload(decode=True)
                    if payload is not None:
                        if isinstance(payload, bytes):
                            text = payload.decode(charset, errors="replace")
                        else:
                            text = payload
                    break
        else:
            charset = msg.get_content_charset() or "utf-8"
            payload = msg.get_payload(decode=True)
            if isinstance(payload, bytes):
                text = payload.decode(charset, errors="replace")
            else:
                text = payload
        return text.strip()

    def _extract_html(self, msg):
        html = ""
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))
                if content_type == "text/html" and "attachment" not in content_disposition:
                    charset = part.get_content_charset() or "utf-8"
                    payload = part.get_payload(decode=True)
                    if payload is not None:
                        if isinstance(payload, bytes):
                            html = payload.decode(charset, errors="replace")
                        else:
                            html = payload
                    break
        else:
            if msg.get_content_type() == "text/html":
                charset = msg.get_content_charset() or "utf-8"
                payload = msg.get_payload(decode=True)
                if isinstance(payload, bytes):
                    html = payload.decode(charset, errors="replace")
                else:
                    html = payload
        return html.strip()

    def _extract_attachments(self, msg):
        attachments = []
        if msg.is_multipart():
            for part in msg.walk():
                content_disposition = str(part.get("Content-Disposition"))
                if "attachment" in content_disposition.lower():
                    filename = part.get_filename()
                    if filename:
                        content_type = part.get_content_type()
                        payload = part.get_payload(decode=True)
                        size = len(payload) if payload else 0
                        attachments.append({
                            "filename": filename,
                            "content_type": content_type,
                            "size": size
                        })
        return attachments

    def fetch_unseen(self):
        if not self.conn:
            raise Exception("Not logged in")
        self.conn.select("INBOX")
        status, messages = self.conn.search(None, 'UNSEEN')
        email_ids = messages[0].split()
        result = []
        for eid in email_ids:
            _, msg_data = self.conn.fetch(eid, '(RFC822)')
            if msg_data and msg_data[0] is not None:
                raw_email = msg_data[0][1]
                if isinstance(raw_email, bytes):
                    msg = email.message_from_bytes(raw_email)
                else:
                    continue  # Skip if raw_email is not bytes
            else:
                continue  # Skip this email if fetch failed

            date_str = self._extract_date(msg)
            from_header = parseaddr(msg.get("From") or "")[1]
            subject_header = msg.get("Subject") or ""
            subject = self._decode_subject(subject_header)
            body_text = self._extract_plain_text(msg)
            body_html = self._extract_html(msg)
            attachments = self._extract_attachments(msg)

            result.append({
                "datetime": date_str,
                "from": from_header,
                "subject": subject,
                "body_text": body_text,
                "body_html": body_html,
                "attachments": attachments
            })
        return result