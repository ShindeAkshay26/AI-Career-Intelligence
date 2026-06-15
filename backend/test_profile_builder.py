from app.services.pdf_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills

from app.services.profile_builder import build_profile

resume = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

skills = extract_skills(
    resume["text"]
)

profile = build_profile(
    resume["text"],
    "Data Science",
    skills
)

print(profile)