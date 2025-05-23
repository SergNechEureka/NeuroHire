from fastembed.embedding import DefaultEmbedding

embedder = DefaultEmbedding()

def embed_text(text):
    return list(embedder.embed([text]))[0]

def embed_query(text):
    return embed_text(text)