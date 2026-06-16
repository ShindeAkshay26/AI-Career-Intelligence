import faiss
import numpy as np


class ResumeVectorStore:

    def __init__(self, dimension):

        self.index = faiss.IndexFlatL2(
            dimension
        )

        self.chunks = []

    def add_chunks(
        self,
        chunks,
        embeddings
    ):

        self.index.add(
            np.array(
                embeddings,
                dtype="float32"
            )
        )

        self.chunks.extend(chunks)

    def search(
        self,
        query_embedding,
        k=3
    ):

        distances, indices = self.index.search(
            np.array(
                [query_embedding],
                dtype="float32"
            ),
            k
        )

        results = []

        for idx in indices[0]:

            if idx < len(self.chunks):
                results.append(
                    self.chunks[idx]
                )

        return results