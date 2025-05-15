import pdfplumber
import pypandoc

def extract_text_from_pdf(file_path: str) -> str:
    text_parts = []
    with pdfplumber.open(file_path) as pdf:
        for i, page in enumerate(pdf.pages, 1):
            text = page.extract_text()
            if text:
                text_parts.append(f"\n===== СТРАНИЦА {i} =====\n{text.strip()}")
    return "\n\n".join(text_parts)

def extract_text_from_docx(file_path: str) -> str:
    try:
        return pypandoc.convert_file(file_path, 'plain')  # можно 'markdown' для разметки
    except Exception as e:
        return f"[Ошибка pypandoc]: {str(e)}"