import re

from fastembed.text import TextEmbedding

embedder = TextEmbedding()

class Embedder:
    def __init__(self) -> None:
        self.embedder = TextEmbedding()

    def embed_text(self, text):
        return list(embedder.embed([text]))[0]

    def embed_query(self, text):
        return self.embed_text(text)

    def split_text_to_chunks(self, text, chunk_size=500, overlap=50):
        words = re.findall(r'\w+|\S', text)

        chunks = []

        for i in range(0, len(words), chunk_size - overlap):
           chunk = " ".join(words[i:i+chunk_size])
           if chunk.strip():
               chunks.append(chunk)

        return chunks
    
    def vectorise(self, cv_id, text):
        ids = []
        embeddings = []
        metadatas = []
        documents = []

        chunks = self.split_text_to_chunks(text)

        for idx, chunk in enumerate(chunks):
            embedding_id = str(idx)
            embedding = self.embed_text(chunk)
            ids.append(embedding_id)
            embeddings.append(embedding)
            documents.append(chunk)
            metadatas.append({"cv_id": cv_id, "embedding_id": embedding_id})

        return {
            "ids": ids,
            "embeddings": embeddings,
            "metadatas": metadatas,
            "documents": documents
        }