import ollama

def generate_summary(text):

    prompt = f"""
    Summarize this resume in 4 concise professional lines.

    Resume:
    {text}
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