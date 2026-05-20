import { useState, useEffect } from "react";
import { useLang } from "../LangContext";
import "./LandingPopup.css";

const CONFETTI_COLORS = ["#FFD700", "#FFA500", "#FF6B00", "#fff", "#FFE082", "#FFCC02"];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 10,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.color,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPopup({ onDone }) {
  const { t } = useLang();
  const [phase, setPhase] = useState("question"); // question | yes-response | no-response

  const handleYes = () => {
    setPhase("yes-response");
    setTimeout(onDone, 3000);
  };

  const handleNo = () => {
    setPhase("no-response");
    setTimeout(onDone, 2500);
  };

  return (
    <div className="popup-overlay">
      {phase === "yes-response" && <Confetti />}

      <div className={`popup-box ${phase !== "question" ? "responded" : ""}`}>
        {/* Sun decoration */}
        <div className="popup-sun">
          <div className="sun-rays" />
          <div className="sun-core">☀️</div>
        </div>

        {phase === "question" && (
          <div className="popup-content question-phase">
            <p className="popup-label">NEWBEAT • 뉴비트</p>
            <h1 className="popup-question">{t("popup_question")}</h1>
            <div className="popup-buttons">
              <button className="btn-yes" onClick={handleYes}>
                {t("popup_yes")}
              </button>
              <button className="btn-no" onClick={handleNo}>
                {t("popup_no")}
              </button>
            </div>
          </div>
        )}

        {phase === "yes-response" && (
          <div className="popup-content response-phase yes-phase">
            <div className="response-emoji">🎉</div>
            <h1 className="response-title">{t("popup_yes_response")}</h1>
            <p className="response-sub">{t("popup_yes_sub")}</p>
            <div className="stars-row">✨ 🌟 ⭐ 🌟 ✨</div>
          </div>
        )}

        {phase === "no-response" && (
          <div className="popup-content response-phase no-phase">
            <div className="response-emoji">☀️</div>
            <h1 className="response-title">{t("popup_no_response")}</h1>
            <p className="response-sub">{t("popup_no_sub")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
