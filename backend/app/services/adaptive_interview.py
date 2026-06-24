import requests


def generate_next_question(
    role,
    summary,
    job_description,
    interview_history,
    question_number
):

    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Role:
{role}

Resume Summary:
{summary}

Job Description:
{job_description}

Interview History:
{interview_history}

Current Question Number:
{question_number}

Rules:

Rules:

1. Ask ONLY ONE interview question.
2. Return ONLY the question.
3. Do not explain.
4. Do not introduce the question.
5. Do not say "Based on candidate background".
6. Do not add greetings.
7. Do not add notes.
8. Output must contain only the question text.
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()

    print(data)

    return data["response"]