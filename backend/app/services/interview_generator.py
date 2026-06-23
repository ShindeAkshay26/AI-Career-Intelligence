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
1. 5 questions should be based on resume skills.
2. 3 questions should be based on job description requirements.
3. 2 questions should focus on missing skills.
4. Questions should be realistic technical interview questions.
5. Return only numbered questions.
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