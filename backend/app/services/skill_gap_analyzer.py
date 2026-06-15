import json

with open("data/role_skills.json", "r") as f:
    ROLE_SKILLS = json.load(f)

def find_skill_gap(current_skills, target_role):

    required_skills = ROLE_SKILLS[target_role]

    missing_skills = [
        skill
        for skill in required_skills
        if skill not in current_skills
    ]

    return {
        "target_role": target_role,
        "current_skills": current_skills,
        "missing_skills": missing_skills
    }