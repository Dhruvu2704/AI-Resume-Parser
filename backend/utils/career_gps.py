# career_gps.py

ROADMAPS = {

    "Data Scientist": [
        "python",
        "sql",
        "pandas",
        "numpy",
        "machine learning",
        "scikit-learn",
        "matplotlib",
        "git",
        "docker"
    ],

    "ML Engineer": [
        "python",
        "machine learning",
        "tensorflow",
        "pytorch",
        "docker",
        "aws",
        "git"
    ],

    "Backend Developer": [
        "python",
        "fastapi",
        "sql",
        "docker",
        "git",
        "rest api"
    ]

}


SKILL_DETAILS = {

    "python": {
        "icon": "🐍",
        "description": "Strengthen your Python programming foundation.",
        "duration": "1 Week"
    },

    "sql": {
        "icon": "📘",
        "description": "Master database querying used in almost every Data Science role.",
        "duration": "2 Weeks"
    },

    "pandas": {
        "icon": "🐼",
        "description": "Manipulate and analyze structured datasets efficiently.",
        "duration": "1 Week"
    },

    "numpy": {
        "icon": "📐",
        "description": "Learn numerical computing for Machine Learning.",
        "duration": "1 Week"
    },

    "machine learning": {
        "icon": "🤖",
        "description": "Understand supervised and unsupervised learning algorithms.",
        "duration": "4 Weeks"
    },

    "scikit-learn": {
        "icon": "📊",
        "description": "Build classical Machine Learning models and pipelines.",
        "duration": "3 Weeks"
    },

    "matplotlib": {
        "icon": "📈",
        "description": "Visualize data and communicate insights effectively.",
        "duration": "1 Week"
    },

    "git": {
        "icon": "🌿",
        "description": "Track code changes and collaborate professionally.",
        "duration": "3 Days"
    },

    "docker": {
        "icon": "🐳",
        "description": "Containerize and deploy Machine Learning applications.",
        "duration": "2 Weeks"
    },

    "tensorflow": {
        "icon": "🧠",
        "description": "Develop deep learning models.",
        "duration": "4 Weeks"
    },

    "pytorch": {
        "icon": "🔥",
        "description": "Build neural networks with PyTorch.",
        "duration": "4 Weeks"
    },

    "aws": {
        "icon": "☁️",
        "description": "Deploy AI applications on cloud infrastructure.",
        "duration": "3 Weeks"
    },

    "fastapi": {
        "icon": "⚡",
        "description": "Develop production-ready AI APIs.",
        "duration": "1 Week"
    },

    "rest api": {
        "icon": "🔗",
        "description": "Build scalable backend services using REST.",
        "duration": "1 Week"
    }

}


def get_career_gps(resume_skills, target_role):

    resume_skills = {
        skill.lower().strip()
        for skill in resume_skills
    }

    roadmap = ROADMAPS.get(target_role)

    if roadmap is None:
        return None

    completed_skills = [
        skill
        for skill in roadmap
        if skill in resume_skills
    ]

    missing_skills = [
        skill
        for skill in roadmap
        if skill not in resume_skills
    ]

    readiness = round(
        (
            len(completed_skills)
            /
            len(roadmap)
        ) * 100
    )

    if readiness >= 90:

        stage = "🚀 Industry Ready"

        timeline = "Ready to Apply"

        message = (
            "Your profile is highly aligned with this role. Focus on polishing your portfolio and interview preparation."
        )

    elif readiness >= 70:

        stage = "📈 Career Builder"

        timeline = "1–2 Months"

        message = (
            "You're close to becoming job-ready. A few focused improvements can significantly strengthen your profile."
        )

    elif readiness >= 50:

        stage = "🌱 Emerging Talent"

        timeline = "3–4 Months"

        message = (
            "You have a solid foundation. Continue building projects while improving your missing technical skills."
        )

    else:

        stage = "🧭 Explorer"

        timeline = "6+ Months"

        message = (
            "Focus on mastering the core fundamentals before moving toward advanced topics."
        )

    next_steps = []

    for skill in missing_skills:

        details = SKILL_DETAILS.get(skill, {})

        next_steps.append({

            "skill": skill.title(),

            "icon": details.get(
                "icon",
                "📍"
            ),

            "description": details.get(
                "description",
                "Recommended learning milestone."
            ),

            "duration": details.get(
                "duration",
                "1 Week"
            )

        })

    return {

        "current_stage": stage,

        "target_role": target_role,

        "readiness": readiness,

        "timeline": timeline,

        "message": message,

        "completed": len(completed_skills),

        "total": len(roadmap),

        "completed_skills": [
            skill.title()
            for skill in completed_skills
        ],

        "next_steps": next_steps

    }