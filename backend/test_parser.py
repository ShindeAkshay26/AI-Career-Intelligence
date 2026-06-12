from app.services.pdf_parser import extract_text_from_pdf

result = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

print(result["file_name"])
print(result["char_count"])
print(result["text"][:500])