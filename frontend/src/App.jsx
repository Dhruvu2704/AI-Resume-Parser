import { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";

// ── Score Ring ──────────────────────────────────────────────────────────────
function HexScoreRing({ score }) {
  const size = 200;
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const progress = (score / 100) * circumference;

  const color =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  const verdict =
    score >= 80 ? "Strong Match" : score >= 60 ? "Moderate Match" : "Weak Match";

  const verdictClass =
    score >= 80 ? "verdict--strong" : score >= 60 ? "verdict--moderate" : "verdict--weak";

  return (
    <div className="hex-score-wrapper">
      <div className="hex-score-glow" style={{ "--glow-color": color }} />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="hex-ring-svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={0}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="score-arc"
          style={{ "--circumference": circumference, "--progress": progress }}
        />
      </svg>
      <div className="hex-score-inner">
        <span className="hex-score-number" style={{ color }}>
          {Number(score).toFixed(0)}
        </span>
        <span className="hex-score-label">ATS SCORE</span>
      </div>
      <div className={`verdict-badge ${verdictClass}`}>{verdict}</div>
    </div>
  );
}

// ── Loading Steps ────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  "Scanning Resume...",
  "Extracting Skills...",
  "Calculating ATS Score...",
  "Generating Recruiter Insights...",
];

function LoadingOverlay({ step }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-logo-pulse">
          <div className="lp-ring lp-ring--1" />
          <div className="lp-ring lp-ring--2" />
          <div className="lp-ring lp-ring--3" />
          <div className="lp-core">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="loading-label">Wrapping your career...</div>
        <div className="loading-steps">
          {LOADING_STEPS.map((s, i) => (
            <div
              key={i}
              className={`loading-step ${i < step ? "done" : i === step ? "active" : "pending"}`}
            >
              <span className="step-dot" />
              <span className="step-text">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill Badge ──────────────────────────────────────────────────────────────
function SkillBadge({ skill, variant }) {
  return (
    <span className={`skill-badge skill-badge--${variant}`}>{skill}</span>
  );
}

// ── Skill Scroll Card ────────────────────────────────────────────────────────
function SkillScrollCard({ skill, index, variant }) {
  const gradients = [
    "linear-gradient(135deg, #8B5CF6, #EC4899)",
    "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    "linear-gradient(135deg, #06B6D4, #3B82F6)",
    "linear-gradient(135deg, #EC4899, #f97316)",
    "linear-gradient(135deg, #10b981, #06B6D4)",
    "linear-gradient(135deg, #f59e0b, #EC4899)",
  ];
  const gapGradients = [
    "linear-gradient(135deg, #ef4444, #f97316)",
    "linear-gradient(135deg, #f97316, #f59e0b)",
    "linear-gradient(135deg, #ef4444, #EC4899)",
    "linear-gradient(135deg, #dc2626, #f97316)",
  ];
  const grad = variant === "matched"
    ? gradients[index % gradients.length]
    : gapGradients[index % gapGradients.length];

  return (
    <div className="skill-scroll-card" style={{ "--card-grad": grad }}>
      <div className="ssc-glow" />
      <div className="ssc-label">{skill}</div>
      <div className="ssc-accent" style={{ background: grad }} />
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  const advanceStep = (ms, step) =>
    new Promise((r) => setTimeout(() => { setLoadingStep(step); r(); }, ms));

  const handleAnalyze = async () => {
    if (!file || !jdText.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd_text", jdText);

    try {
      setLoading(true);
      setLoadingStep(0);
      setResult(null);

      const [response] = await Promise.all([
        axios.post("http://127.0.0.1:8000/analyze-resume", formData),
        (async () => {
          await advanceStep(800, 1);
          await advanceStep(900, 2);
          await advanceStep(900, 3);
        })(),
      ]);

      setResult(response.data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  return (
    <div className="app">
      {/* Ambient orbs */}
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />
      <div className="orb orb--4" />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {loading && <LoadingOverlay step={loadingStep} />}

      <div className="container">

        {/* ── Hero ── */}
        <header className="hero">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            CAREER WRAPPED 2026
          </div>

          <h1 className="hero-title">
            Your Career<br />
            <span className="hero-title--gradient">Wrapped.</span>
          </h1>

          <p className="hero-tagline">AI decoded your professional DNA.</p>

          <p className="hero-description">
            Drop your resume. Paste a job description.<br />
            Get your Career Wrapped in seconds.
          </p>
        </header>

        {/* ── Upload + JD — two-col on desktop, stacked on mobile ── */}
        <div className="input-grid">

          {/* Upload */}
          <div className="glass-card">
            <div className="card-eyebrow">
              <span className="card-eyebrow-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              Upload Resume
            </div>

            <div
              className={`dropzone ${dragOver ? "dropzone--active" : ""} ${file ? "dropzone--filled" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              {file ? (
                <div className="dropzone-file">
                  <div className="file-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-meta">{(file.size / 1024).toFixed(1)} KB · Ready</p>
                  </div>
                  <div className="file-check">✓</div>
                </div>
              ) : (
                <div className="dropzone-empty">
                  <div className="upload-icon-wrap">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="dropzone-cta">Drop your resume</p>
                  <p className="dropzone-hint">PDF or DOCX · Click to browse</p>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="glass-card">
            <div className="card-eyebrow">
              <span className="card-eyebrow-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Job Description
            </div>
            <textarea
              className="jd-textarea"
              rows={10}
              placeholder="Paste the full job description here — the more detail, the better the analysis..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <div className="jd-meta">
              {jdText.length > 0 && (
                <span>{jdText.trim().split(/\s+/).length} words · {jdText.length} chars</span>
              )}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <button
          className="cta-button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          <span className="cta-glow" />
          <span className="cta-shine" />
          <span className="cta-content">
            {loading ? (
              <>
                <span className="cta-spinner" />
                Wrapping your career...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Generate My Career Wrapped
              </>
            )}
          </span>
        </button>

        {/* ── Results ── */}
        {result && (
          <div className="results" ref={resultsRef}>

            {/* Results hero */}
            <div className="results-hero">
              <div className="results-hero-bg" />
              <div className="results-hero-orb rho--1" />
              <div className="results-hero-orb rho--2" />
              <div className="results-hero-inner">
                <p className="results-eyebrow">
                  <span className="eyebrow-dot" />
                  YOUR CAREER WRAPPED
                </p>
                <h2 className="results-headline">Here's your story.</h2>
                <p className="results-filename">{result.filename}</p>
              </div>
            </div>

            {/* ATS Score — centerpiece */}
            <div className="story-card score-centerpiece">
              {/* Career DNA */}
                  {result.career_personality && (
                    <div className="story-card career-dna-card">

                      <div className="story-card-eyebrow">
                        <span className="sca-dot sca-dot--green" />
                        CAREER DNA
                      </div>

                      <div className="career-dna-content">

                        <div className="career-dna-emoji">
                          {result.career_personality.emoji}
                        </div>

                        <h2 className="career-dna-title">
                          {result.career_personality.title}
                        </h2>

                        <p className="career-dna-description">
                          {result.career_personality.description}
                        </p>

                        <div className="career-dna-confidence">

                          <span className="dna-label">
                            CONFIDENCE
                          </span>

                          <span className="dna-score">
                            {result.career_personality.confidence}%
                          </span>

                        </div>

                      </div>

                    </div>
                  )}
              <div className="sc-orb" />
              <div className="story-card-eyebrow">
                <span className="sca-dot sca-dot--purple" />
                ATS COMPATIBILITY
              </div>
              <div className="score-layout">
                <HexScoreRing score={result.match_score} />
                <div className="score-meta">
                  <h3 className="score-meta-title">
                    {result.match_score >= 80
                      ? "You're a strong contender."
                      : result.match_score >= 60
                      ? "You've got a solid foundation."
                      : "Room to grow here."}
                  </h3>
                  <p className="score-meta-body">
                    Your resume was evaluated against the job description for keyword
                    alignment, skill coverage, and recruiter-facing fit signals.
                  </p>
                  <div className="score-bar-wrapper">
                    <div className="score-bar-track">
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${result.match_score}%`,
                          "--bar-color":
                            result.match_score >= 80
                              ? "#10b981"
                              : result.match_score >= 60
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    </div>
                    <span className="score-bar-label">
                      {Number(result.match_score).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>


  {/* Recommended Roles */}
        {result.recommended_roles?.length > 0 && (
          <div className="story-card roles-card">

            <div className="story-card-eyebrow">
              <span className="sca-dot sca-dot--cyan" />
              TOP CAREER PATHS
            </div>

            <h3 className="story-card-title">
              Where you're headed.
            </h3>

            <p className="story-card-sub">
              Based on your skills and experience,
              these roles fit you best.
            </p>

            <div className="roles-grid">

              {result.recommended_roles.map((role, index) => (

                <div
                  key={index}
                  className="role-tile"
                >

                  <div className="role-rank">

                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : "🥉"}

                  </div>

                  <div className="role-name">
                    {role.role}
                  </div>

                  <div className="role-score">
                    {role.score}%
                  </div>

                  <div className="role-description">
                    {role.description}
                  </div>

                </div>

              ))}

            </div>

          </div>
        )}
            {/* Matched Skills — horizontal scroll */}
            {result.matched_skills?.length > 0 && (
              <div className="story-card skills-story-card">
                <div className="story-card-eyebrow">
                  <span className="sca-dot sca-dot--green" />
                  YOUR MATCHED SKILLS
                  <span className="sca-count sca-count--green">{result.matched_skills.length}</span>
                </div>
                <h3 className="story-card-title">What you already bring.</h3>
                <p className="story-card-sub">These skills are your competitive edge for this role.</p>
                <div className="skills-scroll-track">
                  <div className="skills-scroll-inner">
                    {result.matched_skills.map((skill, i) => (
                      <SkillScrollCard key={i} skill={skill} index={i} variant="matched" />
                    ))}
                  </div>
                </div>
                {/* Also render classic badges for accessibility / copy */}
                <div className="skills-badges-row">
                  {result.matched_skills.map((skill, i) => (
                    <SkillBadge key={i} skill={skill} variant="matched" />
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gaps */}
            {result.missing_skills?.length > 0 && (
              <div className="story-card skills-story-card skills-story-card--gap">
                <div className="story-card-eyebrow">
                  <span className="sca-dot sca-dot--red" />
                  SKILL GAPS
                  <span className="sca-count sca-count--red">{result.missing_skills.length}</span>
                </div>
                <h3 className="story-card-title">Your growth opportunity.</h3>
                <p className="story-card-sub">Close these gaps and your profile becomes significantly stronger.</p>
                <div className="skills-scroll-track">
                  <div className="skills-scroll-inner">
                    {result.missing_skills.map((skill, i) => (
                      <SkillScrollCard key={i} skill={skill} index={i} variant="missing" />
                    ))}
                  </div>
                </div>
                <div className="skills-badges-row">
                  {result.missing_skills.map((skill, i) => (
                    <SkillBadge key={i} skill={skill} variant="missing" />
                  ))}
                </div>
              </div>
            )}

            {/* Recruiter Intelligence */}
            <div className="story-card recruiter-card">
              <div className="recruiter-card-gradient" />
              <div className="story-card-eyebrow">
                <span className="sca-dot sca-dot--cyan" />
                RECRUITER INTELLIGENCE
                <span className="sca-tag">AI GENERATED</span>
              </div>
              <h3 className="story-card-title">What a recruiter sees.</h3>
              <div className="recruiter-divider" />
              <p className="summary-body">{result.recruiter_summary}</p>
            </div>

          </div>
        )}

        <footer className="app-footer">
          <div className="footer-inner">
            <span className="footer-logo">◈</span>
            <span>Career Wrapped · Powered by AI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}