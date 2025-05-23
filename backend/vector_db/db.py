import chromadb

def get_client():
    return chromadb.PersistentClient(path="./chromadb_data")

def get_collection(name="cv_embeddings"):
    client = get_client()
    return client.get_or_create_collection(name)