from app.services.pdf_parser import extract_text_from_pdf
from app.services.chunker import chunk_text

from app.services.embedding_service import (
    generate_embeddings,
    model
)

from app.services.vector_store import (
    ResumeVectorStore
)

resume = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

chunks = chunk_text(
    resume["text"]
)

embeddings = generate_embeddings(
    chunks
)

store = ResumeVectorStore(
    embeddings.shape[1]
)

store.add_chunks(
    chunks,
    embeddings
)

query = "What cloud technologies are mentioned?"

query_embedding = model.encode(
    query,
    convert_to_numpy=True
)

results = store.search(
    query_embedding
)

print("\nRESULTS\n")

for r in results:
    print("=" * 50)
    print(r)