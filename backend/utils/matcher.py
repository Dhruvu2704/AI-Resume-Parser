from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_match_score(resume_text, jd_text):
    vectorizer = TfidfVectorizer(stop_words="english")

    tfidf = vectorizer.fit_transform([
        resume_text,
        jd_text
    ])

    similarity = cosine_similarity(
        tfidf[0:1],
        tfidf[1:2]
    )[0][0]

    return round(similarity * 100, 2)
