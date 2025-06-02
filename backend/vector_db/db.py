import chromadb

class ChromaDBService:
    collection_name = "cv_embeddings"

    def __init__(self, path: str = "./chromadb_data"):
        self.path = path
        self.client = chromadb.PersistentClient(path=self.path)

    def get_collection(self):
        return self.client.get_or_create_collection(self.collection_name)
    
    def clear_db(self):
        self.client.delete_collection(self.collection_name)