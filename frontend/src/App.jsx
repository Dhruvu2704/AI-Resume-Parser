import { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { downloadReport } from "./pdf.js";


import LoadingOverlay from "./components/LoadingOverlay";
import LandingScreen  from "./screens/LandingScreen";
import CareerScreen   from "./screens/CareerScreen";
import GPSScreen      from "./screens/GPSScreen";
import ActionPlanScreen from "./screens/ActionPlanScreen";
import ScreenNav      from "./components/ScreenNav";

// ── Screen index constants ────────────────────────────────────────────────────
const SCREEN_LANDING = 0;
const SCREEN_CAREER  = 1;
const SCREEN_GPS     = 2;
const SCREEN_ACTION  = 3;
const TOTAL_SCREENS  = 4;

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  // ── All original state — untouched ────────────────────────────────────────
  const reportRef = useRef(null);
  const [file,        setFile]        = useState(null);
  const [jdText,      setJdText]      = useState("");
  const [result,      setResult]      = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [dragOver,    setDragOver]    = useState(false);
  const fileInputRef = useRef(null);

  // ── New: slide screen index ────────────────────────────────────────────────
  const [screen, setScreen] = useState(SCREEN_LANDING);

  // ── Original helpers — untouched ─────────────────────────────────────────
  const advanceStep = (ms, step) =>
    new Promise((r) => setTimeout(() => { setLoadingStep(step); r(); }, ms));

  // ── handleAnalyze — original logic, only navigation target changed ────────
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
          await advanceStep(600, 1);
          await advanceStep(600, 2);
          await advanceStep(700, 3);
          await advanceStep(700, 4);
          await advanceStep(600, 5);
        })(),
      ]);

      setResult(response.data);
      // Navigate to Screen 2 (Career DNA) when result arrives
      setScreen(SCREEN_CAREER);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── handleDrop — original, untouched ─────────────────────────────────────
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  // ── Slide navigation ──────────────────────────────────────────────────────
  const goNext = () => setScreen((s) => Math.min(s + 1, TOTAL_SCREENS - 1));
  const goPrev = () => setScreen((s) => Math.max(s - 1, SCREEN_LANDING));

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      {/* Loading overlay — fixed, above everything */}
      {loading && <LoadingOverlay step={loadingStep} />}

      {/* Slide viewport — one screen at a time, always 100vw × 100vh */}
      <div className="slide-viewport">

        {screen === SCREEN_LANDING && (
          <LandingScreen
            file={file}
            setFile={setFile}
            jdText={jdText}
            setJdText={setJdText}
            dragOver={dragOver}
            loading={loading}
            fileInputRef={fileInputRef}
            handleAnalyze={handleAnalyze}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
          />
        )}

        {screen === SCREEN_CAREER && result && (
          <CareerScreen result={result} />
        )}

        {screen === SCREEN_GPS && result && (
          <GPSScreen result={result} />
        )}

        {screen === SCREEN_ACTION && result && (
          <ActionPlanScreen result={result} />
        )}
      </div>

      {/* Slide navigation — only shown after result is available */}
      {result && (
        <ScreenNav
          screen={screen}
          total={TOTAL_SCREENS}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}