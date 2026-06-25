import requests


def generate_interview_questions(
    role,
    skills,
    missing_skills,
    job_description,
    summary
):

    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Information:

Role:
{role}

Resume Skills:
{skills}

Missing Skills:
{missing_skills}

Resume Summary:
{summary}

Job Description:
{job_description}

Generate 10 interview questions.

Rules:
1. If resume skills are unavailable, generate general technical questions for the role.
2. 5 questions should be based on resume skills when available.
3. 3 questions should be based on job description requirements when available.
4. 2 questions should focus on missing skills when available.
5. Questions should be realistic technical interview questions.
6. Return only numbered questions.
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]