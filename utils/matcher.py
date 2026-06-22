from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load model once when application starts
model = SentenceTransformer("all-MiniLM-L6-v2")


def calculate_match_score(resume_text, jd_text):

    resume_embedding = model.encode([resume_text])

    jd_embedding = model.encode([jd_text])

    similarity = cosine_similarity(
        resume_embedding,
        jd_embedding
    )[0][0]

    # Convert numpy.float32 to Python float
    return float(round(similarity * 100, 2))