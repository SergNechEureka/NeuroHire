import chromadb
from chromadb.config import Settings
from fastembed import TextEmbedding

client = chromadb.Client(Settings(
    persist_directory="./chroma_db"
))
collection = client.get_or_create_collection("documents")

model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5") 

def add_document(doc_id: str, text: str):
    embedding = list(model.embed([text]))[0] 
    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[doc_id]
    )

def search(query: str, n_results=3):
    embedding = list(model.embed([query]))[0]
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results
    )
    return list(zip(results["ids"][0], results["documents"][0]))