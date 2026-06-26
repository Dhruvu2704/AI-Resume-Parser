// ── LoadingOverlay — preserved exactly from original App.jsx ─────────────────

const LOADING_STEPS = [
  "Parsing Resume",
  "Understanding Experience",
  "Building Career DNA",
  "Simulating Recruiter Review",
  "Mapping Career Roadmap",
  "Preparing Final Report",
];

export default function LoadingOverlay({ step }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-logo-pulse">
          <div className="lp-ring lp-ring--1" />
          <div className="lp-ring lp-ring--2" />
          <div className="lp-ring lp-ring--3" />
          <div className="lp-core">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <p className="loading-label">Analyzing your profile</p>
        <p className="loading-sublabel">This usually takes 10–20 seconds</p>
        <div className="loading-steps">
          {LOADING_STEPS.map((s, i) => (
            <div
              key={i}
              className={`loading-step ${i < step ? "done" : i === step ? "active" : "pending"}`}
            >
              <span className="step-indicator">
                {i < step ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="20,6 9,17 4,12"
                      stroke="#1DB954"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="step-dot" />
                )}
              </span>
              <span className="step-text">{s}</span>
              {i === step && <span className="step-active-bar" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}