// ── GPSScreen — Screen 3 ─────────────────────────────────────────────────────
// Visual source: temp3.html ("Career Wrapped '24 | Career GPS")
// Contains ONLY: Career GPS, Roadmap, Timeline, Career Readiness
// Backend fields: result.career_gps (target_role, current_stage, readiness,
//                 timeline, completed, total, message, next_steps[])

export default function GPSScreen({ result }) {
  const gps = result.career_gps;
  if (!gps) return null;

  return (
    <div className="screen screen--gps">

      {/* ── Top Nav ───────────────────────────────────────────────────── */}
      <header className="topnav">
        <nav className="topnav__inner">
          <div className="topnav__logo">Career Wrapped</div>
          <div className="topnav__links">
            <span className="topnav__link">My Story</span>
            <span className="topnav__link topnav__link--active">Roadmap</span>
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

      {/* ── Scrollable content ────────────────────────────────────────── */}
      <div className="screen__scroll-area">

        {/* ── Hero (temp3 top centre) ──────────────────────────────────── */}
        <section className="gps-hero">
          <div className="section-inner gps-hero__inner">
            <p className="section-eyebrow">Navigation System</p>
            <h1 className="gps-hero__title">
              Career GPS <span className="gps-hero__year">2025</span>
            </h1>
            <p className="gps-hero__sub">
              Your architectural blueprint for the next 12 months. We've
              synthesised your current trajectory into a focused, vertical
              roadmap to your target role.
            </p>
          </div>
        </section>

        {/* ── Two-column roadmap grid (temp3 main layout) ───────────────── */}
        <section className="gps-section">
          <div className="section-inner">
            <div className="gps-layout">

              {/* Left: sticky narrative + progress card */}
              <div className="gps-narrative-col">
                <h2 className="gps-headline">
                  The Road to<br />
                  <span className="gps-target-role">{gps.target_role}</span>
                </h2>
                <p className="gps-body">{gps.message}</p>

                <div className="gps-progress-card">
                  <div className="gps-progress-row">
                    <span className="gps-progress-label">Current Stage</span>
                    <span className="gps-progress-value">{gps.current_stage}</span>
                  </div>
                  <div className="gps-progress-row">
                    <span className="gps-progress-label">Progression to Goal</span>
                    <span className="gps-progress-pct gps-progress-pct--green">
                      {gps.readiness}% Complete
                    </span>
                  </div>
                  <div className="gps-bar-track">
                    <div
                      className="gps-bar-fill"
                      style={{ width: `${gps.readiness}%` }}
                    />
                  </div>
                  <div className="gps-meta-row">
                    <span className="gps-meta-item">
                      <span className="gps-meta-label">Timeline</span>
                      <span className="gps-meta-value">{gps.timeline}</span>
                    </span>
                    <span className="gps-meta-item">
                      <span className="gps-meta-label">Milestones</span>
                      <span className="gps-meta-value">
                        {gps.completed} / {gps.total}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: vertical roadmap spine */}
              <div className="gps-roadmap-col">
                <div className="roadmap">
                  {/* Central spine */}
                  <div className="roadmap-spine" />

                  {/* Start node — current stage */}
                  <div className="roadmap-milestone roadmap-milestone--start">
                    <div className="roadmap-node roadmap-node--start">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="roadmap-milestone-card roadmap-milestone-card--start">
                      <span className="roadmap-tag">Current Stage</span>
                      <h3 className="roadmap-card-title">{gps.current_stage}</h3>
                    </div>
                  </div>

                  {/* Step nodes */}
                  {gps.next_steps.map((step, index) => (
                    <div
                      key={index}
                      className={`roadmap-milestone ${
                        index === 0
                          ? "roadmap-milestone--active"
                          : "roadmap-milestone--locked"
                      }`}
                    >
                      <div
                        className={`roadmap-node ${
                          index === 0
                            ? "roadmap-node--active"
                            : "roadmap-node--locked"
                        }`}
                      >
                        <span className="roadmap-step-icon">{step.icon}</span>
                      </div>
                      <div
                        className={`roadmap-milestone-card ${
                          index === 0 ? "roadmap-milestone-card--active" : ""
                        }`}
                      >
                        <div className="roadmap-card-top">
                          <div className="roadmap-card-heading">
                            <h3 className="roadmap-card-title">{step.skill}</h3>
                            <span
                              className={`roadmap-tag ${
                                index === 0 ? "roadmap-tag--active" : ""
                              }`}
                            >
                              {index === 0 ? "Active Path" : "Locked"}
                            </span>
                          </div>
                          <span className="roadmap-duration">{step.duration}</span>
                        </div>
                        <p className="roadmap-card-desc">{step.description}</p>
                      </div>
                    </div>
                  ))}

                  {/* Destination node */}
                  <div className="roadmap-milestone roadmap-milestone--destination">
                    <div className="roadmap-node roadmap-node--destination">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                          stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                        <line
                          x1="4" y1="22" x2="4" y2="15"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="roadmap-milestone-card roadmap-milestone-card--destination">
                      <span className="roadmap-tag roadmap-tag--destination">
                        Destination
                      </span>
                      <h3 className="roadmap-card-title roadmap-card-title--destination">
                        {gps.target_role}
                      </h3>
                      <p className="roadmap-card-desc">
                        Arrival. Readiness for production-level work at your
                        target role.
                      </p>
                    </div>
                  </div>

                </div>{/* /roadmap */}
              </div>

            </div>{/* /gps-layout */}
          </div>
        </section>

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