# career_personality.py

PERSONALITIES = {

    "The Builder": {
        "skills": [
            "fastapi",
            "flask",
            "django",
            "docker",
            "git",
            "github",
            "mongodb",
            "mysql",
            "postgresql"
        ],
        "description":
        "You enjoy building products, APIs, systems, and real-world applications. You focus on creating solutions that people can use."
    },

    "The Innovator": {
        "skills": [
            "machine learning",
            "deep learning",
            "tensorflow",
            "pytorch",
            "nlp",
            "rag",
            "python"
            "langchain"
        ],
        "description":
        "You are driven by AI, experimentation, and solving complex problems. You enjoy exploring cutting-edge technologies and creating intelligent solutions."
    },

    "The Analyst": {
        "skills": [
            "sql",
            "pandas",
            "numpy",
            "mysql",
            "postgresql"
        ],
        "description":
        "You enjoy working with data, identifying patterns, and transforming information into meaningful insights."
    },

    "The Cloud Architect": {
        "skills": [
            "aws",
            "azure",
            "docker",
            "kubernetes"
        ],
        "description":
        "You enjoy designing scalable systems and deploying applications in cloud environments."
    },

    "The Explorer": {
        "skills": [],
        "description":
        "You have a diverse skill set and are still discovering your strongest specialization. Your versatility is your strength."
    }
}


def get_career_personality(skills):
    """
    Determines the user's career personality
    based on extracted resume skills.
    """

    if not skills:
        return {
            "title": "The Explorer",
            "emoji": "🧭",
            "description":
            PERSONALITIES["The Explorer"]["description"],
            "confidence": 0
        }

    scores = {}

    skill_set = set(
        skill.lower().strip()
        for skill in skills
    )

    for personality, data in PERSONALITIES.items():

        personality_skills = set(
            skill.lower()
            for skill in data["skills"]
        )

        score = len(
            skill_set.intersection(
                personality_skills
            )
        )

        scores[personality] = score

    best_personality = max(
        scores,
        key=scores.get
    )

    best_score = scores[best_personality]

    total_matches = sum(scores.values())

    confidence = (
        round(
            (best_score / total_matches) * 100,
            1
        )
        if total_matches > 0
        else 0
    )

    return {
        "title": best_personality,
        "description":
            PERSONALITIES[best_personality]["description"],
        "confidence": confidence
    }