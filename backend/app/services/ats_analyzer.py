import re

def analyze_resume(resume_text, skills):

    score = 0

    strengths = []
    weaknesses = []

    # Skills

    skill_score = min(len(skills) * 2, 40)
    score += skill_score

    if len(skills) >= 10:
        strengths.append(
            "Strong technical skill set"
        )
    else:
        weaknesses.append(
            "Limited technical skills detected"
        )

    # Projects

    if "project" in resume_text.lower():
        score += 20
        strengths.append(
            "Projects section detected"
        )
    else:
        weaknesses.append(
            "No projects section found"
        )

    # Experience

    if "experience" in resume_text.lower():
        score += 15
        strengths.append(
            "Professional experience found"
        )
    else:
        weaknesses.append(
            "No experience section found"
        )

    # Education

    if "education" in resume_text.lower():
        score += 10
        strengths.append(
            "Education section present"
        )

    # Certifications

    if re.search(
        r'certification|certified',
        resume_text.lower()
    ):
        score += 15
        strengths.append(
            "Certifications found"
        )
    else:
        weaknesses.append(
            "No certifications detected"
        )

    return {
        "score": score,
        "strengths": strengths,
        "weaknesses": weaknesses
    }