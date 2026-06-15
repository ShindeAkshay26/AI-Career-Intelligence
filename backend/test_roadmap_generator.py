from app.services.roadmap_generator import generate_roadmap

missing_skills = [
    "Machine Learning",
    "Deep Learning",
    "Transformers",
    "RAG",
    "FAISS",
    "LangChain",
    "LLM"
]

roadmap = generate_roadmap(
    missing_skills
)

print(roadmap)