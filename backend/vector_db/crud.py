from .db import get_collection
from .utils import embed_text

def add(cv_id, chunks) -> None:
    collection = get_collection()
    ids = []
    embeddings = []
    metadatas = []
    documents = []

    for idx, chunk in enumerate(chunks):
        embedding_id = str(idx)
        embedding = embed_text(chunk)
        ids.append(embedding_id)
        embeddings.append(embedding)
        documents.append(chunk)
        metadatas.append({"cv_id": cv_id, "embedding_id": embedding_id})
    
    collection.add(ids=ids, embeddings=embeddings, metadatas=metadatas, documents=documents)

def delete_by_cv_id(cv_id) -> None:
    collection = get_collection()
    collection.delete(where={"cv_id": cv_id})

def get_by_cv_id(cv_id: str):
    collection = get_collection()
    result = collection.get(where={"cv_id": cv_id}, include=["metadatas", "embeddings", "documents"])
    ids = result.get("ids", [])
    metadatas = result.get("metadatas", [])
    embeddings = result.get("embeddings", [])
    documents = result.get("documents", [])
    return [
        {
            "embedding_id": ids[i],
            "text": metadatas[i].get("text", ""),
            "embedding": embeddings[i],
            "documents": documents[i]
        }
        for i in range(len(ids))
    ]

RELEVANCE_THRESHOLD = 0.5

def search_candidates(query_text, top_k=5):
    collection = get_collection()

    print(collection.count()) 
    all_records = collection.get() 
    print(all_records)

    query_embedding = embed_text(query_text)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    matches = []
    for i in range(len(results['ids'][0])):
        score = results['distances'][0][i]
        match = {
            "embedding_id": results['ids'][0][i],
            "score": score,
            "cv_id": results['metadatas'][0][i]['cv_id'],
            "text": results['metadatas'][0][i]['text'],
            "is_relevant": score <= RELEVANCE_THRESHOLD
        }
        matches.append(match)
    return [m for m in matches if m["is_relevant"]]