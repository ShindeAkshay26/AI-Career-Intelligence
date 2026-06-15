import json
import random

with open("data/interview_questions.json") as f:
    QUESTION_BANK = json.load(f)

def generate_questions(skills):

    questions = []

    for skill in skills:

        if skill in QUESTION_BANK:

            question = random.choice(
                QUESTION_BANK[skill]
            )

            questions.append({
                "skill": skill,
                "question": question
            })

    return questions