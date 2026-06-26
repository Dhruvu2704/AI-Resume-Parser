// ── ScoreRing — preserved exactly from original App.jsx ──────────────────────

export default function ScoreRing({ score }) {
  const size         = 340;
  const strokeWidth  = 14;
  const r            = 155;
  const circumference = 2 * Math.PI * r;
  const progress     = (score / 100) * circumference;
  const dashoffset   = circumference - progress;

  const verdict =
    score >= 80 ? "Strong Match"
    : score >= 60 ? "Moderate Match"
    : "Needs Improvement";

  const verdictClass =
    score >= 80 ? "verdict--strong"
    : score >= 60 ? "verdict--moderate"
    : "verdict--weak";

  return (
    <div className="score-ring-wrapper">
      <div className="score-ring-glow-bg" />
      <div className="score-ring-container">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="score-ring-svg"
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <filter id="ring-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle
            cx="170" cy="170" r={r}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Inner accent */}
          <circle
            cx="170" cy="170" r="138"
            fill="none"
            stroke="rgba(29,185,84,0.06)"
            strokeWidth="1"
          />
          {/* Outer guide dashes */}
          <circle
            cx="170" cy="170" r="172"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Progress arc */}
          <circle
            cx="170" cy="170" r={r}
            fill="none"
            stroke="#1DB954"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            filter="url(#ring-glow)"
            className="score-arc"
            style={{ "--circumference": circumference, "--dashoffset": dashoffset }}
          />
        </svg>

        {/* Center content */}
        <div className="score-ring-inner">
          <span className="score-number">{Number(score).toFixed(0)}</span>
          <span className="score-unit">/ 100</span>
        </div>
      </div>

      {/* Verdict badge */}
      <div className="score-verdict-row">
        <span className={`score-verdict-dot ${verdictClass}`} />
        <span className={`score-verdict-label ${verdictClass}`}>{verdict}</span>
      </div>
    </div>
  );
}