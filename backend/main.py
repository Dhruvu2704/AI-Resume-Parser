from typing import List
from fastapi import FastAPI, UploadFile, File, Form
import os
from fastapi.middleware.cors import CORSMiddleware
from utils.career_gps import get_career_gps

from utils.parser import (
    extract_pdf_text,
    extract_docx_text
)

from utils.skill_matcher import (
    compare_skills,
    extract_skills
)

from utils.career_personality import (
    get_career_personality
)

from utils.recommended_roles import (
    get_recommended_roles
)

from utils.recruiter_ai import (
    generate_recruiter_report
)

from utils.matcher import calculate_match_score
from utils.ranker import rank_resumes

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "https://careerwrapped-ai.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "Resume Parser API Running"
    }


@app.post("/job-description")
async def job_description(
    jd: str = Form(...)
):
    return {
        "job_description": jd
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

    skills = compare_skills(
        resume_text,
        jd_text
    )

    resume_skills = extract_skills(
        resume_text
    )

    career_personality = (
        get_career_personality(
            resume_skills
        )
    )

    recommended_roles = (
        get_recommended_roles(
            resume_skills
        )
    )

    career_gps = get_career_gps(
        resume_skills,
        recommended_roles[0]["role"]
    )

    recruiter_report = generate_recruiter_report(
        resume_text=resume_text,
        ats_score=score,
        matched_skills=skills["matched_skills"],
        missing_skills=skills["missing_skills"],
        career_personality=career_personality,
        recommended_roles=recommended_roles,
        career_gps=career_gps
    )

    return {

        "filename": file.filename,

        "match_score": score,

        "matched_skills":
            skills["matched_skills"],

        "missing_skills":
            skills["missing_skills"],

        "career_personality":
            career_personality,

        "recommended_roles":
            recommended_roles,

        "career_gps":
            career_gps,

        "recruiter_report":
            recruiter_report
    }

@app.post("/skill-analysis")
async def skill_analysis(
    resume_text: str = Form(...),
    jd_text: str = Form(...)
):

    result = compare_skills(
        resume_text,
        jd_text
    )

    return result


@app.post("/recruiter-analysis")
async def recruiter_analysis(
    resume_text: str = Form(...),
    jd_text: str = Form(...)
):

    score = calculate_match_score(
        resume_text,
        jd_text
    )

    skills = compare_skills(
        resume_text,
        jd_text
    )

    if score >= 80:
        summary = (
            "Strong candidate match. Most required skills are present."
        )

    elif score >= 60:
        summary = (
            "Moderate candidate match. Some skills are missing."
        )

    else:
        summary = (
            "Low candidate match. Significant skill gaps detected."
        )

    return {
        "match_score": score,
        "matched_skills": skills["matched_skills"],
        "missing_skills": skills["missing_skills"],
        "recruiter_summary": summary
    }


@app.post("/rank-resumes")
async def rank_multiple_resumes(
    jd_text: str = Form(...)
):

    resumes = [

        {
            "name": "Candidate_A",
            "text": """
            Python FastAPI SQL
            Machine Learning
            Docker
            AWS
            """
        },

        {
            "name": "Candidate_B",
            "text": """
            Python SQL
            Pandas
            NumPy
            """
        },

        {
            "name": "Candidate_C",
            "text": """
            Python FastAPI
            SQL Docker
            Machine Learning
            Git
            """
        }
    ]

    ranking = rank_resumes(
        resumes,
        jd_text
    )

    return ranking


@app.post("/rank-uploaded-resumes")
async def rank_uploaded_resumes(
    files: List[UploadFile] = File(...),
    jd_text: str = Form(...)
):

    resumes = []

    for file in files:

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        with open(file_path, "wb") as f:
            f.write(await file.read())

        if file.filename.endswith(".pdf"):
            resume_text = extract_pdf_text(
                file_path
            )

        elif file.filename.endswith(".docx"):
            resume_text = extract_docx_text(
                file_path
            )

        else:
            continue

        resumes.append({
            "name": file.filename,
            "text": resume_text
        })

    ranking = rank_resumes(
        resumes,
        jd_text
    )

    return ranking