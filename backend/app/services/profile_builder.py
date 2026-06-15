import re

def extract_email(text):

    match = re.search(
        r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',
        text
    )

    return match.group(0) if match else None


def extract_phone(text):

    match = re.search(
        r'(\+?\d[\d\s\-]{8,}\d)',
        text
    )

    return match.group(0) if match else None

def extract_name(text):

    first_line = text.split()[:3]

    return " ".join(first_line)


def build_profile(
    resume_text,
    predicted_role,
    skills
):

    profile = {
        "name": extract_name(resume_text),
        "email": extract_email(resume_text),
        "phone": extract_phone(resume_text),
        "predicted_role": predicted_role,
        "skills": skills
    }

    return profile