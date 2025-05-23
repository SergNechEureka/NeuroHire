from ..services.chatgpt import extract_metadata_from_cv

def extract_semantic_metadata(text):
    try:
        meta = extract_metadata_from_cv(text)
        parsed_ok = True
        parsing_info = None
    except Exception as e:
        meta = {}
        parsed_ok = False
        parsing_info = str(e)
    return meta, parsed_ok, parsing_info

