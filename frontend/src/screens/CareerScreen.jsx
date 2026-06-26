// ── CareerScreen — Screen 2 ──────────────────────────────────────────────────
// Visual source: temp4.html (DNA section) + temp1.html (ATS ring + Recruiter)
// Contains ONLY: Career DNA, ATS Health, Recruiter Intelligence
// Backend fields: result.career_personality, result.match_score,
//                 result.matched_skills, result.career_gps?.readiness,
//                 result.recruiter_report

import ScoreRing from "../components/ScoreRing";

export default function CareerScreen({ result }) {
  const cp  = result.career_personality;
  const rr  = result.recruiter_report;
  const ms  = result.match_score;

  return (
    <div className="screen screen--career">

      {/* ── Top Nav ───────────────────────────────────────────────────── */}
      <header className="topnav">
        <nav className="topnav__inner">
          <div className="topnav__logo">Career Wrapped</div>
          <div className="topnav__links">
            <span className="topnav__link topnav__link--active">My Story</span>
            <span className="topnav__link">Roadmap</span>
            <span className="topnav__link">ATS Insights</span>
            <span className="topnav__link">Action Plan</span>
          </div>
          <button
              onClick={() => downloadReport(reportRef.current)}
          >
              Share Report
          </button>
        </nav>
      </header>

      {/* ── Scrollable content area ───────────────────────────────────── */}
      <div className="screen__scroll-area">

        {/* ════════════════════════════════════════════
            CAREER DNA  (temp4 lower section design)
        ════════════════════════════════════════════ */}
        {cp && (
          <section className="dna-section">
            <div className="section-inner">

              {/* Two-column layout: visual left, narrative right */}
              <div className="dna-layout">

                {/* Left: emoji avatar ring */}
                <div className="dna-visual-col">
                  <div className="dna-avatar-ring">
                    <span className="dna-emoji-large">{cp.emoji}</span>
                  </div>
                </div>

                {/* Right: narrative content */}
                <div className="dna-content-col">
                  <div className="dna-score-row">
                    <span className="dna-match-badge">
                      {Number(ms).toFixed(1)}% MATCH
                    </span>
                    <div className="dna-score-line" />
                  </div>

                  <p className="dna-eyebrow">Career DNA Archetype</p>
                  <h2 className="dna-archetype-title">{cp.title}</h2>
                  <p className="dna-description">{cp.description}</p>

                  <div className="dna-traits-grid">
                    <div className="dna-trait">
                      <span className="dna-trait-label">Confidence</span>
                      <span className="dna-trait-value">{cp.confidence}%</span>
                    </div>
                    <div className="dna-trait">
                      <span className="dna-trait-label">ATS Score</span>
                      <span className="dna-trait-value">
                        {Number(ms).toFixed(0)}/100
                      </span>
                    </div>
                    <div className="dna-trait">
                      <span className="dna-trait-label">Readiness</span>
                      <span className="dna-trait-value">
                        {result.career_gps?.readiness ?? "—"}%
                      </span>
                    </div>
                  </div>
                </div>

              </div>{/* /dna-layout */}
            </div>

            {/* Bento strip — keywords + readiness card (temp4 bottom grid) */}
            <div className="dna-bento-strip">
              <div className="section-inner">
                <div className="bento-grid">

                  {result.matched_skills?.length > 0 && (
                    <div className="bento-card bento-card--wide">
                      <p className="bento-label">Keywords Found</p>
                      <div className="bento-chips">
                        {result.matched_skills.map((skill, i) => (
                          <span key={i} className="bento-chip">
                            {skill.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bento-card bento-card--accent">
                    <p className="bento-label bento-label--on-accent">
                      Readiness Score
                    </p>
                    <div className="bento-score-block">
                      <p className="bento-score-number">
                        {result.career_gps?.readiness ?? ms}/100
                      </p>
                      <p className="bento-score-sub">
                        {ms >= 80
                          ? "You're in the top tier of candidates."
                          : ms >= 60
                          ? "Solid foundation, room to grow."
                          : "Key gaps to close for this role."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            ATS HEALTH  (temp1 centerpiece ring)
        ════════════════════════════════════════════ */}
        {ms != null && (
          <section className="ats-section">
            <div className="section-inner ats-inner">
              <p className="section-eyebrow">ATS System Health</p>
              <ScoreRing score={ms} />
              <div className="ats-headline-block">
                <h2 className="ats-headline">
                  {ms >= 80
                    ? "You're a strong contender."
                    : ms >= 60
                    ? "You've got a solid foundation."
                    : "There's room to grow here."}
                </h2>
                <p className="ats-subtext">
                  Resume evaluated against the job description for keyword
                  alignment, skill coverage, and recruiter-facing fit signals.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            RECRUITER INTELLIGENCE  (temp1 section 2)
        ════════════════════════════════════════════ */}
        {rr && (
          <section className="recruiter-section">
            <div className="section-inner">
              <div className="recruiter-layout">

                {/* Left: verdict + recommendation */}
                <div className="recruiter-left">
                  <h3 className="recruiter-col-eyebrow">Recruiter Verdict</h3>

                  <div className="recruiter-verdict-card">
                    <p className="recruiter-verdict-text">
                      "{rr.overall_verdict}"
                    </p>
                    <div className="recruiter-confidence-block">
                      <div className="recruiter-confidence-row">
                        <span className="recruiter-confidence-label">
                          Hiring Confidence
                        </span>
                        <span className="recruiter-confidence-num">
                          {rr.hiring_confidence}%
                        </span>
                      </div>
                      <div className="recruiter-bar-track">
                        <div
                          className="recruiter-bar-fill"
                          style={{ width: `${rr.hiring_confidence ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {rr.recommendation && (
                    <div className="recruiter-recommendation">
                      <p className="recruiter-recommendation-text">
                        {rr.recommendation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: strengths + growth areas */}
                <div className="recruiter-right">
                  <h3 className="recruiter-col-eyebrow">Critical Assessment</h3>
                  <div className="recruiter-cards-grid">

                    {rr.strengths?.length > 0 && (
                      <div className="recruiter-card recruiter-card--strengths">
                        <div className="recruiter-card-header">
                          <span className="recruiter-card-dot recruiter-card-dot--green" />
                          <span className="recruiter-card-header-label">
                            Strengths
                          </span>
                        </div>
                        <ul className="recruiter-list">
                          {rr.strengths.map((item, i) => (
                            <li key={i} className="recruiter-list-item">
                              <span className="recruiter-list-num recruiter-list-num--green">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <p className="recruiter-list-text">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {rr.improvements?.length > 0 && (
                      <div className="recruiter-card recruiter-card--growth">
                        <div className="recruiter-card-header">
                          <span className="recruiter-card-dot recruiter-card-dot--orange" />
                          <span className="recruiter-card-header-label recruiter-card-header-label--orange">
                            Growth Areas
                          </span>
                        </div>
                        <ul className="recruiter-list">
                          {rr.improvements.map((item, i) => (
                            <li key={i} className="recruiter-list-item">
                              <span className="recruiter-list-num recruiter-list-num--orange">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <p className="recruiter-list-text">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Footer inside scroll area */}
        <footer className="screen-footer">
          <div className="screen-footer__inner">
            <span className="screen-footer__brand">Career Wrapped Editorial</span>
            <div className="screen-footer__links">
              <span className="screen-footer__link">Privacy Policy</span>
              <span className="screen-footer__link">Terms of Service</span>
              <span className="screen-footer__link">Methodology</span>
            </div>
            <div className="screen-footer__status">
              <span className="screen-footer__dot" />
              <span className="screen-footer__status-label">Systems Online</span>
            </div>
          </div>
        </footer>

      </div>{/* /scroll-area */}
    </div>
  );
}