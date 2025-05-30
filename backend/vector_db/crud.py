import uuid
from .db import get_collection
from .utils import Embedder

class VectorDBService:
    RELEVANCE_THRESHOLD = 0.5

    def __init__(self) -> None:
        self.embedder = Embedder()

    def add(self, cv_id: uuid.UUID, vector_data) -> None:
        collection = get_collection()

        ids = vector_data.get("ids")
        embeddings = vector_data.get("embeddings")
        metadatas = vector_data.get("metadatas")
        documents = vector_data.get("documents")

        if not all([ids, embeddings, metadatas, documents]):
            raise ValueError("vector_data must contain non-empty 'ids', 'embeddings', 'metadatas', and 'documents'")
        
        collection.add(ids=ids, embeddings=embeddings, metadatas=metadatas, documents=documents)

    def delete_by_cv_id(self, cv_id: uuid.UUID) -> None:
        collection = get_collection()
        collection.delete(where={"cv_id": str(cv_id)})

    def get_by_cv_id(self, cv_id: str):
        collection = get_collection()
        result = collection.get(where={"cv_id": str(cv_id)}, include=["metadatas", "embeddings", "documents"])
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

    def search_candidates(self, query_text, top_k=5):
        collection = get_collection()

        query_embedding = self.embedder.embed_query(query_text)
        
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
                "documents": results['documents'][0][i],
                "is_relevant": score <= self.RELEVANCE_THRESHOLD
            }
            matches.append(match)
        return [m for m in matches if m["is_relevant"]]