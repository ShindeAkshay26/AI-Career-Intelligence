import fitz
import re

def extract_text_from_pdf(pdf_path):

    text = ""

    doc = fitz.open(pdf_path)

    for page in doc:
        text += page.get_text()

    doc.close()

    text = re.sub(r"\s+", " ", text)

    return {
        "file_name": pdf_path.split("\\")[-1],
        "text": text.strip(),
        "char_count": len(text)
    }