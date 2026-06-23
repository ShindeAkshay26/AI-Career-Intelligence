from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)
from app.services.interview_generator import (
    generate_interview_questions
)
from app.services.jd_matcher import (
    calculate_jd_match
)
import tempfile
import os

from app.models.chat_model import ChatRequest
from app.services.jd_matcher import (
    calculate_jd_match
)
from app.services.rag_chat import ResumeRAG
from app.services.resume_summary import generate_summary
from app.services.resume_classifier import predict_category
from app.services.pdf_parser import extract_text_from_pdf
from app.services.skill_extractor import extract_skills
from app.services.ats_analyzer import analyze_resume

router = APIRouter()

# Global active resume
current_rag = None


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.post("/analyze-resume")
async def analyze_resume_api(
    file: UploadFile = File(...)
):

    global current_rag

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

        # Build vector store for uploaded resume
        current_rag = ResumeRAG(
            resume_text=text
        )

        summary = generate_summary(text)

        predicted_role = predict_category(
            text
        )

        skills = extract_skills(text)

        ats_result = analyze_resume(
            text,
            skills
        )

        return {
            "predicted_role": predicted_role,
            "summary": summary,
            "skills": skills,
            "ats_analysis": ats_result
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@router.post("/chat")
def chat(request: ChatRequest):

    global current_rag

    if current_rag is None:

        return {
            "answer": "Please upload a resume first."
        }

    result = current_rag.chat(
        request.question
    )

    return {
        "answer": result["answer"]
    }




@router.post("/jd-match")
async def jd_match_api(
    file: UploadFile = File(...),
    job_description: str = Form(...)
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

        result = calculate_jd_match(
            resume["text"],
            job_description
        )

        return result

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


@router.post("/generate-interview")
async def generate_interview_api(
    file: UploadFile = File(...),
    job_description: str = Form(...)
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

        role = predict_category(text)

        skills = extract_skills(text)

        summary = generate_summary(text)

        jd_result = calculate_jd_match(
            text,
            job_description
        )

        questions = generate_interview_questions(
            role,
            skills,
            jd_result["missing_skills"],
            job_description,
            summary
        )

        return {
            "role": role,
            "questions": questions
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)