import requests


def evaluate_interview(
    role,
    summary,
    job_description,
    interview_history
):

    prompt = f"""
You are a senior technical interviewer.

Role:
{role}

Resume Summary:
{summary}

Job Description:
{job_description}

Interview Transcript:
{interview_history}

Evaluate the candidate.

Return:

Overall Score: X/100

Technical Knowledge: X/100

Communication: X/100

Confidence: X/100

Strengths:
- point
- point

Weaknesses:
- point
- point

Hiring Recommendation:
text
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3.2",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]