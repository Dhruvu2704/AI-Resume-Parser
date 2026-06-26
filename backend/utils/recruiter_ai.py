import os
import json
import re

import google.generativeai as genai

from dotenv import load_dotenv


# ----------------------------------------------------
# Gemini Setup
# ----------------------------------------------------

load_dotenv()

print("Gemini Key Loaded:", os.getenv("GEMINI_API_KEY"))

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

response = model.generate_content("Say hello in one sentence.")
print(response.text)


# ----------------------------------------------------
# JSON Cleaner
# ----------------------------------------------------

def clean_json(text: str):

    text = text.strip()

    text = re.sub(
        r"```json",
        "",
        text
    )

    text = re.sub(
        r"```",
        "",
        text
    )

    return text.strip()


# ----------------------------------------------------
# Recruiter AI
# ----------------------------------------------------

def generate_recruiter_report(
    resume_text,
    ats_score,
    matched_skills,
    missing_skills,
    career_personality,
    recommended_roles,
    career_gps
):

    prompt = f"""

You are an experienced Senior Technical Recruiter with more than 15 years of hiring experience.

Your task is to objectively evaluate a candidate.

Do NOT invent information.

Base every observation ONLY on the provided resume analysis.

----------------------------------

ATS Score:
{ats_score}

Career Personality:
{career_personality["title"]}

Career Readiness:
{career_gps["readiness"]}%

Target Role:
{career_gps["target_role"]}

Matched Skills:
{", ".join(matched_skills)}

Missing Skills:
{", ".join(missing_skills)}

Recommended Roles:
{", ".join([role["role"] for role in recommended_roles])}

Resume

{resume_text}

----------------------------------

Return ONLY valid JSON.

Use exactly this schema.

{{
    "overall_verdict":"",
    "strengths":[
        "",
        "",
        ""
    ],
    "improvements":[
        "",
        "",
        ""
    ],
    "hiring_confidence":0,
    "recommendation":""
}}

Rules

Keep the verdict under 60 words.

Provide exactly 3 strengths.

Provide exactly 3 improvements.

Hiring confidence must be between 0 and 100.

Recommendation must be one short paragraph.

Do not wrap the JSON inside markdown.

"""

    try:

        response = model.generate_content(
            prompt
        )

        cleaned = clean_json(
            response.text
        )

        report = json.loads(
            cleaned
        )

        return report

    except Exception as e:

        print(
            "Recruiter AI Error:",
            e
        )

        return {

            "overall_verdict":
            "Unable to generate recruiter analysis.",

            "strengths": [
                "Resume uploaded successfully."
            ],

            "improvements": [
                "Please try again."
            ],

            "hiring_confidence":
            ats_score,

            "recommendation":
            "The recruiter report could not be generated due to an AI service error."

        }