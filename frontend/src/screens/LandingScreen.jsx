// ── LandingScreen — Screen 1 ─────────────────────────────────────────────────
// Visual source: temp4.html ("Career Wrapped | AI Resume Intelligence")
// Contains ONLY: Logo, Hero, Resume Upload, Job Description, Generate Report
// All handler props come from App.jsx — no logic lives here

export default function LandingScreen({
  file,
  setFile,
  jdText,
  setJdText,
  dragOver,
  loading,
  fileInputRef,
  handleAnalyze,
  handleDrop,
  handleDragOver,
  handleDragLeave,
}) {
  return (
    <div className="screen screen--landing">

      {/* ── Top Nav (temp4 pattern) ──────────────────────────────────────── */}
      <header className="topnav">
        <nav className="topnav__inner">
          <div className="topnav__logo">Career Wrapped</div>

          <div className="topnav__links">
            <span className="topnav__link topnav__link--active">My Story</span>
            <span className="topnav__link">Roadmap</span>
            <span className="topnav__link">ATS Insights</span>
            <span className="topnav__link">Action Plan</span>
          </div>

          <div className="topnav__badge">AI Intelligence</div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <main className="landing__main">
        <div className="landing__glow-bg" aria-hidden="true" />

        <div className="landing__content">

          {/* Headline block */}
          <div className="landing__headline-block">
            <h1 className="landing__title">Career Wrapped</h1>
            <p className="landing__mono-sub">AI Resume Intelligence</p>
          </div>

          {/* ── Dual Input Grid (temp4 two-panel) ── */}
          <div className="landing__input-grid">

            {/* Drop Zone */}
            <div
              className={
                "landing__dropzone" +
                (dragOver ? " landing__dropzone--active" : "") +
                (file    ? " landing__dropzone--filled"  : "")
              }
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              {/* Hidden file input — original unchanged */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />

              {/* Hover overlay */}
              <div className="landing__dropzone-hover" aria-hidden="true" />

              {file ? (
                /* File ready state */
                <div className="landing__file-ready">
                  <div className="landing__file-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="landing__file-info">
                    <p className="landing__file-name">{file.name}</p>
                    <p className="landing__file-meta">
                      {(file.size / 1024).toFixed(1)} KB · Ready to analyze
                    </p>
                  </div>
                  <div className="landing__file-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline
                        points="20,6 9,17 4,12"
                        stroke="#003914" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                /* Empty state */
                <div className="landing__dropzone-empty">
                  <svg
                    className="landing__dropzone-icon"
                    width="48" height="48" viewBox="0 0 24 24" fill="none"
                  >
                    <path
                      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                    <polyline
                      points="17,8 12,3 7,8"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                    <line
                      x1="12" y1="3" x2="12" y2="15"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    />
                  </svg>
                  <p className="landing__dropzone-cta">Upload Resume</p>
                  <p className="landing__dropzone-hint">PDF, DOCX up to 10MB</p>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="landing__jd-card">
              <label className="landing__jd-label">Job Description</label>
              <textarea
                className="landing__jd-textarea"
                placeholder="Paste the target role description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              {jdText.length > 0 && (
                <p className="landing__jd-meta">
                  {jdText.trim().split(/\s+/).length} words
                </p>
              )}
            </div>

          </div>{/* /input-grid */}

          {/* Generate Report CTA */}
          <div className="landing__cta-wrap">
            <button
              className="landing__cta-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="landing__cta-spinner" />
                  Analyzing...
                </>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>

        </div>{/* /content */}
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
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

    </div>
  );
}