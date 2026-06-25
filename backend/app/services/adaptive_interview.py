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

1. Ask ONLY ONE interview question.

2. Return ONLY the question text.

3. NEVER repeat a previously asked question.

4. NEVER ask a question that is semantically similar to a previous question.

5. Analyze the candidate's Resume Summary, Job Description, and Interview History before generating the next question.

6. Generate questions based on:
   - Candidate skills
   - Candidate experience
   - Candidate projects
   - Job requirements

7. If the candidate answered well, increase the difficulty level.

8. If the candidate answered poorly or incompletely, ask a follow-up question to assess understanding.

9. Throughout the interview, cover different areas of the candidate's profile instead of staying on a single topic.

10. Ensure the interview progresses naturally from basic concepts to advanced concepts.

11. Focus on evaluating technical knowledge, problem-solving ability, practical experience, and decision-making skills.

12. Do not provide explanations, feedback, hints, answers, greetings, introductions, notes, or commentary.

13. Output must contain ONLY the next interview question.

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