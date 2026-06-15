from app.services.pdf_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills

resume = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

skills = extract_skills(
    resume["text"]
)

print(skills)