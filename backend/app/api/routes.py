from fastapi import APIRouter, UploadFile, File
import tempfile
import os

from app.services.resume_classifier import (
    predict_category
)
from app.models.chat_model import ChatRequest
from app.services.rag_chat import ResumeRAG
from app.services.resume_summary import generate_summary
from app.services.resume_classifier import predict_category
from app.services.pdf_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills
from app.services.ats_analyzer import analyze_resume

router = APIRouter()

rag = ResumeRAG(
    "sample_resumes/sample_resume.pdf"
)


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.post("/analyze-resume")
async def analyze_resume_api(
    file: UploadFile = File(...)
):

    temp_path = None

    try:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp:

            content = await file.read()

            temp.write(content)

            temp_path = temp.name

        resume = extract_text_from_pdf(
            temp_path
        )

        text = resume["text"]

        summary = generate_summary(text)

        predicted_role = predict_category(
            text
        )

        skills = extract_skills(text)

        ats_result = analyze_resume(
            text,
            skills
        )
        print("\nSUMMARY:")
        print(summary)

        return {
            "predicted_role":predicted_role,
            "summary":summary,
            "skills": skills,
            "ats_analysis": ats_result
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)




@router.post("/chat")
def chat(request: ChatRequest):

    result = rag.chat(
        request.question
    )

    return {
        "answer": result["answer"]
    }