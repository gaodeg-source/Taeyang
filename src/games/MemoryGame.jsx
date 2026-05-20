import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../LangContext";
import "./MemoryGame.css";

const EMOJIS = ["☀️", "🌟", "✨", "🔥", "💫", "🌙", "⭐", "🌞"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createDeck() {
  return shuffle([...EMOJIS, ...EMOJIS].map((emoji, id) => ({
    id,
    emoji,
    flipped: false,
    matched: false,
  })));
}

export default function MemoryGame() {
  const { t } = useLang();
  const [cards, setCards] = useState(createDeck);
  const [flipped, setFlipped] = useState([]); // indices of flipped (not matched) cards
  const [matched, setMatched] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const timerRef = useRef(null);
  const lockRef = useRef(false);

  useEffect(() => {
    if (running && !won) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running, won]);

  const flip = useCallback((idx) => {
    if (lockRef.current) return;
    if (cards[idx].matched || cards[idx].flipped) return;
    if (flipped.length === 1 && flipped[0] === idx) return;

    if (!running) setRunning(true);

    const newCards = cards.map((c, i) =>
      i === idx ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    if (flipped.length === 0) {
      setFlipped([idx]);
    } else {
      const first = flipped[0];
      setAttempts((a) => a + 1);
      lockRef.current = true;

      if (newCards[first].emoji === newCards[idx].emoji) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === first || i === idx ? { ...c, matched: true, flipped: true } : c
            )
          );
          setMatched((m) => {
            const next = m + 1;
            if (next === EMOJIS.length) {
              setWon(true);
              setRunning(false);
            }
            return next;
          });
          setFlipped([]);
          lockRef.current = false;
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === first || i === idx ? { ...c, flipped: false } : c
            )
          );
          setFlipped([]);
          lockRef.current = false;
        }, 900);
      }
    }
  }, [cards, flipped, running]);

  const restart = () => {
    clearInterval(timerRef.current);
    setCards(createDeck());
    setFlipped([]);
    setMatched(0);
    setAttempts(0);
    setTime(0);
    setRunning(false);
    setWon(false);
    lockRef.current = false;
  };

  return (
    <main className="page memory-page">
      <div className="memory-wrap">
        <div className="memory-header">
          <Link to="/games" className="back-link">← {t("nav_games")}</Link>
          <h1 className="memory-title">{t("memory_title")}</h1>
          <p className="memory-subtitle">{t("memory_subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="memory-stats">
          <div className="stat-box">
            <div className="stat-label">{t("memory_time")}</div>
            <div className="stat-val">{time}{t("memory_seconds")}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">{t("memory_attempts")}</div>
            <div className="stat-val">{attempts}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">{t("memory_matched")}</div>
            <div className="stat-val">{matched}/{EMOJIS.length}</div>
          </div>
          <button className="mem-restart-btn" onClick={restart}>
            {t("memory_restart")}
          </button>
        </div>

        {/* Grid */}
        <div className="memory-grid">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`mem-card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
              onClick={() => flip(idx)}
            >
              <div className="mem-card-inner">
                <div className="mem-card-back">☀️</div>
                <div className="mem-card-front">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Win overlay */}
        {won && (
          <div className="memory-win-overlay">
            <div className="win-box">
              <div className="win-emoji">🌟</div>
              <h2 className="win-title">{t("memory_win")}</h2>
              <p className="win-sub">{t("memory_win_sub")}</p>
              <div className="win-details">
                <span>⏱ {time}{t("memory_seconds")}</span>
                <span>🎯 {attempts} {t("memory_attempts")}</span>
              </div>
              <button className="quiz-next-btn" onClick={restart}>
                {t("memory_restart")}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
