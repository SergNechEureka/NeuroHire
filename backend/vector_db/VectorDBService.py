import uuid
from typing import List
from .db import ChromaDBService
from .utils import Embedder

class VectorDBService:
    RELEVANCE_THRESHOLD = 0.5

    def __init__(self) -> None:
        self.embedder = Embedder()
        self.db_service = ChromaDBService()

    def add(self, cv_id: uuid.UUID, vector_data) -> None:
        collection = self.db_service.get_collection()

        ids = vector_data.get("ids")
        embeddings = vector_data.get("embeddings")
        metadatas = vector_data.get("metadatas")
        documents = vector_data.get("documents")

        if not all([ids, embeddings, metadatas, documents]):
            raise ValueError("vector_data must contain non-empty 'ids', 'embeddings', 'metadatas', and 'documents'")
        
        collection.add(ids=ids, embeddings=embeddings, metadatas=metadatas, documents=documents)

    def delete_by_cv_id(self, cv_id: uuid.UUID) -> None:
        collection = self.db_service.get_collection()
        collection.delete(where={"cv_id": str(cv_id)})

    def delete_by_cv_ids(self, cv_ids: List[uuid.UUID]) -> None:
        collection = self.db_service.get_collection()
        str_ids = [str(cv_id) for cv_id in cv_ids]
        for cv_id in str_ids:
            collection.delete(where={"cv_id": cv_id})

    def get_by_cv_id(self, cv_id: str):
        collection = self.db_service.get_collection()
        result = collection.get(where={"cv_id": str(cv_id)}, include=["metadatas", "embeddings", "documents"])
        ids = result.get("ids", [])
        metadatas = result.get("metadatas", [])
        embeddings = result.get("embeddings", [])
        documents = result.get("documents", [])
        return [
            {
                "embedding_id": ids[i],
                "text": metadatas[i].get("text", "") if isinstance(metadatas, list) and i < len(metadatas) and isinstance(metadatas[i], dict) else "",
                "embedding": embeddings[i] if embeddings is not None else None,
                "documents": documents[i] if documents is not None else None
            }
            for i in range(len(ids))
        ]

    def search_candidates(self, query_text, top_k=5):
        collection = self.db_service.get_collection()

        query_embedding = self.embedder.embed_query(query_text)
        # Ensure the embedding is a flat list of floats
        if hasattr(query_embedding, "tolist"):
            query_embedding = query_embedding.tolist()
        # If the embedding is a list of lists (e.g., [[...]]), flatten it
        if isinstance(query_embedding, list) and len(query_embedding) == 1 and isinstance(query_embedding[0], (list, tuple)):
            query_embedding = list(map(float, query_embedding[0]))
        else:
            query_embedding = list(map(float, query_embedding))
        
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

        matches = []
        distances = results.get('distances')
        ids = results.get('ids')
        metadatas = results.get('metadatas')
        documents = results.get('documents')
        if distances is None or ids is None or metadatas is None or documents is None:
            return []
        if not distances or not ids or not metadatas or not documents:
            return []
        for i in range(len(ids[0])):
            score = None
            if distances[0] is not None and i < len(distances[0]):
                score = distances[0][i]
            match = {
                "embedding_id": ids[0][i],
                "score": score,
                "cv_id": metadatas[0][i]['cv_id'] if metadatas[0][i] is not None and 'cv_id' in metadatas[0][i] else None,
                "documents": documents[0][i] if documents[0] is not None and i < len(documents[0]) else None,
                "is_relevant": score is not None and score <= self.RELEVANCE_THRESHOLD
            }
            matches.append(match)
        return [m for m in matches if m["is_relevant"]]
    
    def clear_db(self):
        self.db_service.clear_db()

