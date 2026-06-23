import re

SKILLS_DB = [
    "python",
    "java",
    "c++",
    "sql",
    "fastapi",
    "flask",
    "django",
    "machine learning",
    "deep learning",
    "nlp",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "git",
    "github",
    "streamlit",
    "langchain",
    "rag",
    "mongodb",
    "mysql",
    "postgresql"
]


def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:

        if re.search(r"\b" + re.escape(skill) + r"\b", text):
            found_skills.append(skill)

    return list(set(found_skills))


def compare_skills(resume_text, jd_text):

    resume_skills = set(extract_skills(resume_text))

    jd_skills = set(extract_skills(jd_text))

    matched = list(resume_skills.intersection(jd_skills))

    missing = list(jd_skills - resume_skills)

    return {
        "matched_skills": sorted(matched),
        "missing_skills": sorted(missing)
    }