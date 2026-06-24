import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jdText) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd_text", jdText);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-resume",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#facc15";
    return "#ef4444";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "30px",
        }}
      >
        AI Resume Analyzer
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            padding: "12px",
            background: "white",
            borderRadius: "8px",
          }}
        />

        <textarea
          rows="10"
          placeholder="Paste Job Description Here..."
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "10px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            padding: "15px",
            background: loading ? "#64748b" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "12px",
              marginTop: "20px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Analysis Result
            </h2>

            <p>
              <strong>Filename:</strong> {result.filename}
            </p>

            <p>
              <strong>Match Score:</strong>{" "}
              {Number(result.match_score).toFixed(2)}%
            </p>

            <div
              style={{
                width: "100%",
                height: "20px",
                background: "#334155",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: `${result.match_score}%`,
                  height: "100%",
                  background: getScoreColor(
                    result.match_score
                  ),
                  transition: "0.5s",
                }}
              />
            </div>

            <hr
              style={{
                margin: "20px 0",
                borderColor: "#334155",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "30px",
              }}
            >
              <div>
                <h3>✅ Matched Skills</h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {result.matched_skills?.map(
                    (skill, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "6px 0",
                        }}
                      >
                        • {skill}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3>❌ Missing Skills</h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {result.missing_skills?.map(
                    (skill, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "6px 0",
                        }}
                      >
                        • {skill}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                background: "#0f172a",
                borderRadius: "10px",
              }}
            >
              <h3>Recruiter Summary</h3>

              <p
                style={{
                  lineHeight: "1.7",
                }}
              >
                {result.recruiter_summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;