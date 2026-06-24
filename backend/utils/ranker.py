from utils.matcher import calculate_match_score


def rank_resumes(resumes, jd_text):

    results = []

    for resume in resumes:

        score = calculate_match_score(
            resume["text"],
            jd_text
        )

        results.append({
            "candidate": resume["name"],
            "score": round(float(score), 2)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results