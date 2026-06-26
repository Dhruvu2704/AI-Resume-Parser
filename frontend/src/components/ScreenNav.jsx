// ── ScreenNav — slide navigation (Previous / Next + dot indicators) ──────────

const SCREEN_LABELS = ["Landing", "Career DNA", "Career GPS", "Action Plan"];

export default function ScreenNav({ screen, total, onPrev, onNext }) {
  return (
    <nav className="screen-nav" aria-label="Slide navigation">

      {/* Previous button */}
      <button
        className="screen-nav__btn screen-nav__btn--prev"
        onClick={onPrev}
        disabled={screen === 0}
        aria-label="Previous screen"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polyline
            points="15,18 9,12 15,6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="screen-nav__btn-label">Prev</span>
      </button>

      {/* Dot indicators */}
      <div className="screen-nav__dots" role="tablist">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === screen}
            aria-label={SCREEN_LABELS[i] || `Screen ${i + 1}`}
            className={`screen-nav__dot${i === screen ? " screen-nav__dot--active" : ""}`}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        className="screen-nav__btn screen-nav__btn--next"
        onClick={onNext}
        disabled={screen === total - 1}
        aria-label="Next screen"
      >
        <span className="screen-nav__btn-label">Next</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polyline
            points="9,18 15,12 9,6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </nav>
  );
}