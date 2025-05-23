import pdfplumber
import pypandoc
import re

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
        return clean_pandoc_table(pypandoc.convert_file(file_path, 'markdown', extra_args=('--standalone','--wrap=none')))

    except Exception as e:
        return f"[Ошибка pypandoc]: {str(e)}"

def clean_pandoc_table(text):
    lines = text.splitlines()
    cleaned = []
    for line in lines:
        #if re.match(r'^\s*(?:[\+:\-|]+\s*|[\|>\s]*)$', line):
        if not re.search(r'\w', line):
            continue

        cleaned.append(clean_symbols(line))
    return "\n".join(cleaned)

def clean_symbols(text):
    text = text[2:] if text.startswith("> ") else text
    text = re.sub(r'\|\s+\|', '', text)   
    text = text.replace('|', '')    
    text = text.replace('<!---->', '')   
    text = text.replace('**>**', '')      
    text = text.replace('**', '')        
    text = text.replace('>>', '')        
    text = text.replace('> >', '')    
    text = re.sub(r' {2,}', ' ', text)    
    text = re.sub(r'^\s+', '', text, flags=re.MULTILINE)   
    text = re.sub(r'\s+$', '', text, flags=re.MULTILINE)   
    text = text.replace('<!-- -->', '')
    text = text.replace('{.underline}', '')
    return text

def split_text_to_chunks(text, chunk_size=500, overlap=50):
    words = re.findall(r'\w+|\S', text)
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i+chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks