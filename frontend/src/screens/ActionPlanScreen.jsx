// ── ActionPlanScreen — Screen 4 ──────────────────────────────────────────────
// Visual source: temp2.html (Skills + Action Plan) + temp3.html bottom (Roles)
// Contains ONLY: Recommended Roles, Matched Skills, Missing Skills, Action Plan
// Backend fields: result.recommended_roles, result.matched_skills,
//                 result.missing_skills, result.career_gps.next_steps,
//                 result.career_gps.timeline

export default function ActionPlanScreen({ result }) {
  const gps = result.career_gps;

  return (
    <div className="screen screen--action">

      {/* ── Top Nav ───────────────────────────────────────────────────── */}
      <header className="topnav">
        <nav className="topnav__inner">
          <div className="topnav__logo">Career Wrapped</div>
          <div className="topnav__links">
            <span className="topnav__link">My Story</span>
            <span className="topnav__link">Roadmap</span>
            <span className="topnav__link">ATS Insights</span>
            <span className="topnav__link topnav__link--active">Action Plan</span>
          </div>
         <button
              onClick={() => downloadReport(reportRef.current)}
          >
              Share Report
          </button>
        </nav>
      </header>

      {/* ── Scrollable content ────────────────────────────────────────── */}
      <div className="screen__scroll-area">

        {/* ════════════════════════════════════════════
            SKILLS  (temp2 bento-inspired layout)
        ════════════════════════════════════════════ */}
        {(result.matched_skills?.length > 0 || result.missing_skills?.length > 0) && (
          <section className="skills-section">
            <div className="section-inner">

              {/* Hero headline (temp2 top) */}
              <div className="skills-section-header">
                <p className="section-eyebrow">Phase 03: The Expertise</p>
                <h2 className="skills-title">
                  Refining your <em>edge.</em>
                </h2>
              </div>

              {/* Bento grid */}
              <div className="skills-bento">

                {result.matched_skills?.length > 0 && (
                  <div className="skills-card skills-card--matched">
                    <div className="skills-card-header">
                      <h3 className="skills-card-label">Matched Skills</h3>
                      <span className="skills-count-badge skills-count-badge--green">
                        {result.matched_skills.length} skills
                      </span>
                    </div>
                    <div className="skills-chips">
                      {result.matched_skills.map((skill, i) => (
                        <span key={i} className="skill-chip skill-chip--matched">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <polyline
                              points="20,6 9,17 4,12"
                              stroke="currentColor" strokeWidth="3"
                              strokeLinecap="round" strokeLinejoin="round"
                            />
                          </svg>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.missing_skills?.length > 0 && (
                  <div className="skills-card skills-card--missing">
                    <div className="skills-card-header">
                      <h3 className="skills-card-label">Growth Opportunities</h3>
                      <span className="skills-count-badge skills-count-badge--orange">
                        {result.missing_skills.length} gaps
                      </span>
                    </div>
                    <div className="skills-chips">
                      {result.missing_skills.map((skill, i) => (
                        <span key={i} className="skill-chip skill-chip--missing">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <line
                              x1="12" y1="5" x2="12" y2="19"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            />
                            <line
                              x1="5" y1="12" x2="19" y2="12"
                              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            />
                          </svg>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            RECOMMENDED ROLES  (temp3 card design)
        ════════════════════════════════════════════ */}
        {result.recommended_roles?.length > 0 && (
          <section className="roles-section">
            <div className="section-inner">
              <div className="roles-header">
                <div>
                  <p className="section-eyebrow">Market Analysis</p>
                  <h2 className="roles-title">Recommended Archetypes</h2>
                </div>
                <p className="roles-subtitle">
                  Roles identified based on your skill synergy and current
                  market trajectory.
                </p>
              </div>

              <div className="roles-grid">
                {result.recommended_roles.map((role, index) => (
                  <div
                    key={index}
                    className={`role-card ${index === 0 ? "role-card--best" : ""}`}
                  >
                    {index === 0 && (
                      <div className="role-best-badge-wrap">
                        <span className="role-best-badge">Best Match</span>
                      </div>
                    )}
                    <div className="role-card-body">
                      <h3 className="role-name">{role.role}</h3>
                      <div className="role-score-row">
                        <span
                          className={`role-score-num ${
                            index === 0 ? "role-score-num--primary" : ""
                          }`}
                        >
                          {role.score}%
                        </span>
                        <span className="role-score-label">Synergy</span>
                      </div>
                      <p className="role-description">{role.description}</p>
                      <div className="role-bar-track">
                        <div
                          className="role-bar-fill"
                          style={{ width: `${role.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
            ACTION PLAN  (temp2 action cards)
        ════════════════════════════════════════════ */}
        {gps?.next_steps?.length > 0 && (
          <section className="action-section">
            <div className="section-inner">

              <div className="action-header">
                <div>
                  <p className="section-eyebrow">Strategic Roadmap</p>
                  <h2 className="action-title">Your Action Plan</h2>
                </div>
                <div className="action-timeline">
                  <p className="action-timeline-label">Estimated Window</p>
                  <p className="action-timeline-value">{gps.timeline}</p>
                </div>
              </div>

              <div className="action-cards-grid">
                {gps.next_steps.map((step, index) => (
                  <div key={index} className="action-card">
                    <div className="action-card-icon">
                      <span className="action-icon-emoji">{step.icon}</span>
                    </div>
                    <h4 className="action-card-title">{step.skill}</h4>
                    <p className="action-card-desc">{step.description}</p>
                    <div className="action-card-footer">
                      <span className="action-priority">
                        Priority {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="action-arrow">→</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivational closing (temp2) */}
              <div className="action-closing">
                <h3 className="action-closing-title">
                  You're closer than <br />
                  <em className="action-closing-em">you think.</em>
                </h3>
              </div>

            </div>
          </section>
        )}

        {/* Footer */}
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