from app.services.skill_gap_analyzer import find_skill_gap

current_skills = [
    "Python",
    "SQL",
    "Azure"
]

result = find_skill_gap(
    current_skills,
    "AI Engineer"
)

print(result)