from app.services.skill_extractor import extract_skills


def calculate_jd_match(
    resume_text,
    job_description
):

    resume_skills = set(
        skill.lower()
        for skill in extract_skills(resume_text)
    )

    jd_skills = set(
        skill.lower()
        for skill in extract_skills(job_description)
    )

    matched = resume_skills.intersection(
        jd_skills
    )

    missing = jd_skills - resume_skills

    score = 0

    if len(jd_skills) > 0:
        score = round(
            (len(matched) / len(jd_skills)) * 100
        )

    return {
        "match_score": score,
        "matching_skills": list(matched),
        "missing_skills": list(missing)
    }