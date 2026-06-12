from app.services.pdf_parser import extract_text_from_pdf

text = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

print(text[:2000])