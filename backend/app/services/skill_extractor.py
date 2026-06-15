import json
import re

with open("data/skills.json", "r") as f:
    SKILLS = json.load(f)

def extract_skills(text):

    found_skills = set()

    text_lower = text.lower()

    for skill in SKILLS:
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'

        if re.search(pattern, text_lower):
            found_skills.add(skill)

    return sorted(list(found_skills))