# recommended_roles.py

ROLE_MAP = {

    "Data Scientist": [
        "python",
        "machine learning",
        "pandas",
        "numpy",
        "sql",
        "scikit-learn"
    ],

    "AI Engineer": [
        "python",
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "nlp"
    ],

    "ML Engineer": [
        "python",
        "machine learning",
        "docker",
        "aws",
        "tensorflow",
        "pytorch"
    ],

    "Backend Developer": [
        "python",
        "fastapi",
        "flask",
        "django",
        "sql",
        "git"
    ],

    "Data Analyst": [
        "sql",
        "pandas",
        "numpy",
        "excel",
        "matplotlib"
    ],

    "AI Developer": [
        "python",
        "machine learning",
        "nlp",
        "fastapi",
        "git"
    ],

    "Software Engineer": [
        "python",
        "java",
        "git",
        "sql",
        "docker"
    ]
}


ROLE_EMOJIS = {
    "Data Scientist": "📊",
    "AI Engineer": "🤖",
    "ML Engineer": "🚀",
    "Backend Developer": "⚙️",
    "Data Analyst": "📈",
    "AI Developer": "🧠",
    "Software Engineer": "💻"
}


ROLE_DESCRIPTIONS = {
    "Data Scientist":
        "Uses data and machine learning to generate insights and predictions.",

    "AI Engineer":
        "Builds intelligent systems powered by modern AI technologies.",

    "ML Engineer":
        "Develops, deploys, and scales machine learning solutions.",

    "Backend Developer":
        "Designs APIs, databases, and server-side systems.",

    "Data Analyst":
        "Transforms raw data into actionable business insights.",

    "AI Developer":
        "Creates AI-powered applications and automation solutions.",

    "Software Engineer":
        "Builds software products and scalable applications."
}


def get_recommended_roles(skills):
    """
    Returns top 3 recommended roles
    based on skill overlap.
    """

    if not skills:
        return []

    skills = {
        skill.lower().strip()
        for skill in skills
    }

    recommendations = []

    for role, required_skills in ROLE_MAP.items():

        matched_skills = [
            skill
            for skill in required_skills
            if skill in skills
        ]

        score = round(
            (
                len(matched_skills)
                /
                len(required_skills)
            ) * 100
        )

        recommendations.append({
            "role": role,
            "emoji": ROLE_EMOJIS.get(role, "🎯"),
            "score": score,
            "matched_skills": matched_skills,
            "description":
                ROLE_DESCRIPTIONS.get(
                    role,
                    "Career path recommendation."
                )
        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:3]