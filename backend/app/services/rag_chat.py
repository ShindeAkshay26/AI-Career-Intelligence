from app.services.pdf_parser import extract_text_from_pdf
from app.services.chunker import chunk_text

from app.services.embedding_service import (
    generate_embeddings,
    model
)

from app.services.vector_store import (
    ResumeVectorStore
)

from app.services.resume_chat import (
    ask_resume
)


class ResumeRAG:

    def __init__(self, resume_path):

        self.resume_path = resume_path

        self.store = None

        self._build_vector_store()

    def _build_vector_store(self):

        resume = extract_text_from_pdf(
            self.resume_path
        )

        text = resume["text"]

        chunks = chunk_text(text)

        embeddings = generate_embeddings(
            chunks
        )

        self.store = ResumeVectorStore(
            embeddings.shape[1]
        )

        self.store.add_chunks(
            chunks,
            embeddings
        )

    def chat(
        self,
        question,
        k=3
    ):

        query_embedding = model.encode(
            question,
            convert_to_numpy=True
        )

        retrieved_chunks = self.store.search(
            query_embedding,
            k=k
        )

        context = "\n".join(
            retrieved_chunks
        )

        answer = ask_resume(
            question,
            context
        )

        return {
            "question": question,
            "context": context,
            "answer": answer
        }