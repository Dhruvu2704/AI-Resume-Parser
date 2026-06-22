from fastapi import FastAPI, UploadFile, File, Form
import os

from utils.parser import (
    extract_pdf_text,
    extract_docx_text
)
from utils.matcher import calculate_match_score


app = FastAPI()

@app.post("/job-description")
async def job_description(
    jd: str = Form(...)
):
    return {
        "job_description": jd
    }

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Resume Parser API Running"
    }

@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".pdf"):
        text = extract_pdf_text(file_path)

    elif file.filename.endswith(".docx"):
        text = extract_docx_text(file_path)

    else:
        return {
            "error": "Unsupported file format"
        }

    return {
        "filename": file.filename,
        "extracted_text": text[:3000]
    }

@app.post("/match-score")
async def match_score(
    resume_text: str = Form(...),
    jd_text: str = Form(...)
):

    score = calculate_match_score(
        resume_text,
        jd_text
    )

    return {
        "match_score": score
    }

@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    jd_text: str = Form(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith(".pdf"):
        resume_text = extract_pdf_text(file_path)

    elif file.filename.endswith(".docx"):
        resume_text = extract_docx_text(file_path)

    else:
        return {
            "error": "Unsupported file format"
        }

    score = calculate_match_score(
        resume_text,
        jd_text
    )

    return {
        "filename": file.filename,
        "match_score": score
    }