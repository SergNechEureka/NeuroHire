from fastapi import APIRouter, UploadFile, File, Depends
from ..services import parser, file_utils, meta_extractor
from ..file_metadata.models import CVMeta
from ..file_metadata.crud import add_or_update_cv
from ..file_metadata.db import get_session
from ..vector_db.crud import add as add_embeddings, delete_by_cv_id as delete_embeddings_by_cv_id

router = APIRouter()

@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
    session=Depends(get_session) 
):
    file_ext = file.filename.split(".")[-1].lower()
    temp_path = file_utils.save_temp_file(file, file_ext)

    if file_ext == "pdf":
        text = parser.extract_text_from_pdf(temp_path)
    elif file_ext == "docx":
        text = parser.extract_text_from_docx(temp_path)
    else:
        file_utils.remove_file(temp_path)
        return {"error": "Поддерживаются только PDF и DOCX"}

    sem_meta, parsed_ok, parsing_info = meta_extractor.extract_semantic_metadata(text)
    meta = file_utils.generate_file_metadata(session, sem_meta, file, temp_path)
    file_utils.remove_file(temp_path)


    cv_meta = CVMeta(
        cv_id=meta["cv_id"],
        filename=meta["filename"],
        filetype=meta["filetype"],
        filesize=meta["filesize"],
        uploaded_at=meta["uploaded_at"],
        candidate_name=sem_meta.get("candidate_name"),
        birth_date=sem_meta.get("birth_date"),
        email=sem_meta.get("email"),
        phone=sem_meta.get("phone"),
        country=sem_meta.get("country"),
        parsed_ok=parsed_ok,
        parsing_info=parsing_info
    )
    add_or_update_cv(session, cv_meta)

    delete_embeddings_by_cv_id(meta["cv_id"]) 
    chunks = parser.split_text_to_chunks(text, chunk_size=500, overlap=50)
    add_embeddings(meta["cv_id"], chunks)
 
    return {
        "cv_id": meta["cv_id"],
        "filename": meta["filename"],
        "filesize": meta["filesize"],
        "meta": sem_meta,
        "parsed_ok": parsed_ok
    }