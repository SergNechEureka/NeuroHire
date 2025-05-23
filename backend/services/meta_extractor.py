from ..services.chatgpt import extract_metadata_from_cv, extract_experience_from_cv, extract_skill_from_cv

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

def extract_semantic_experience(text):
    try:
        experience = extract_experience_from_cv(text)
        parsed_ok = True
        parsing_info = None
    except Exception as e:
        experience = []
        parsed_ok = False
        parsing_info = str(e)
    return experience, parsed_ok, parsing_info

def extract_semantic_skill(text):
    try:
        skill = extract_skill_from_cv(text)
        parsed_ok = True
        parsing_info = None
    except Exception as e:
        skill = []
        parsed_ok = False
        parsing_info = str(e)
    return skill, parsed_ok, parsing_info

