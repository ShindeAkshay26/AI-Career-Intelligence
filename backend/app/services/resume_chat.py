import ollama


def ask_resume(question, context):

    prompt = f"""
You are an AI Resume Assistant.

Answer ONLY from the resume context.

Resume Context:
{context}

Question:
{question}

Answer:
"""

    response = ollama.chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"]