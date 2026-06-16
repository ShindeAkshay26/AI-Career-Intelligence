from app.services.rag_chat import ResumeRAG

rag = ResumeRAG(
    "sample_resumes/sample_resume.pdf"
)

while True:

    question = input(
        "\nAsk a question (type exit): "
    )

    if question.lower() == "exit":
        break

    result = rag.chat(question)

    print("\nAnswer:\n")
    print(result["answer"])