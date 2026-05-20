// ============================================
// MEMORY — 4x4 card flip matching game
// ============================================

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck() {
  const pairs = [];
  for (let i = 1; i <= 8; i++) pairs.push(i, i);
  return shuffle(pairs).map((photoId, idx) => ({
    id: idx,
    photoId,
    flipped: false,
    matched: false,
  }));
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function MemoryGame({ setRoute }) {
  const { t, lang } = useLang();
  const [deck, setDeck] = React.useState(() => makeDeck());
  const [selected, setSelected] = React.useState([]); // indices of currently-flipped non-matched
  const [attempts, setAttempts] = React.useState(0);
  const [matchedCount, setMatchedCount] = React.useState(0);
  const [startTime, setStartTime] = React.useState(() => Date.now());
  const [now, setNow] = React.useState(() => Date.now());
  const [won, setWon] = React.useState(false);
  const lockRef = React.useRef(false);

  // Tick clock
  React.useEffect(() => {
    if (won) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [won]);

  const flipCard = (idx) => {
    if (lockRef.current) return;
    if (won) return;
    const card = deck[idx];
    if (card.flipped || card.matched) return;

    const newDeck = deck.slice();
    newDeck[idx] = { ...card, flipped: true };
    setDeck(newDeck);

    const newSelected = [...selected, idx];
    if (newSelected.length === 1) {
      setSelected(newSelected);
    } else if (newSelected.length === 2) {
      setSelected(newSelected);
      setAttempts(a => a + 1);
      lockRef.current = true;
      const [a, b] = newSelected;
      const aCard = newDeck[a];
      const bCard = newDeck[b];
      if (aCard.photoId === bCard.photoId) {
        // match
        setTimeout(() => {
          setDeck(d => {
            const dd = d.slice();
            dd[a] = { ...dd[a], matched: true };
            dd[b] = { ...dd[b], matched: true };
            return dd;
          });
          setMatchedCount(m => {
            const next = m + 1;
            if (next === 8) setWon(true);
            return next;
          });
          setSelected([]);
          lockRef.current = false;
        }, 500);
      } else {
        // mismatch — flip back
        setTimeout(() => {
          setDeck(d => {
            const dd = d.slice();
            dd[a] = { ...dd[a], flipped: false };
            dd[b] = { ...dd[b], flipped: false };
            return dd;
          });
          setSelected([]);
          lockRef.current = false;
        }, 900);
      }
    }
  };

  const restart = () => {
    setDeck(makeDeck());
    setSelected([]);
    setAttempts(0);
    setMatchedCount(0);
    setStartTime(Date.now());
    setNow(Date.now());
    setWon(false);
    lockRef.current = false;
  };

  const elapsed = (won ? now : Date.now()) - startTime;

  return (
    <div className="page">
      <button className="back-link" onClick={() => setRoute("games")}>
        <Icon.ChevronLeft />
        <span>{t.memory.back}</span>
      </button>

      <div className="game-header">
        <h1>{t.memory.title}</h1>
        <div className="sub ko">{t.memory.subtitle}</div>
      </div>

      <div className="memory-screen">
        <div className="memory-meta">
          <div className="stat">
            <div className="label">{t.memory.time}</div>
            <div className="value">{formatTime(now - startTime)}</div>
          </div>
          <div className="stat">
            <div className="label">{t.memory.attempts}</div>
            <div className="value">{attempts}</div>
          </div>
          <div className="stat">
            <div className="label">{t.memory.matched}</div>
            <div className="value">{matchedCount} / 8</div>
          </div>
          <button className="btn-primary" onClick={restart}>{t.memory.restart}</button>
        </div>

        <div className="memory-grid">
          {deck.map((card, i) => (
            <div
              key={card.id}
              className={`memory-card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
              onClick={() => flipCard(i)}
            >
              <div className="memory-card-face back">
                <Icon.Heart />
              </div>
              <div className="memory-card-face front photo-placeholder">
                <Icon.HeartOutline />
                <span className="photo-num">{lang === "en" ? `Photo #${card.photoId}` : `사진 #${card.photoId}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {won && (
        <div className="win-overlay">
          <div className="win-card">
            <div className="popup-hearts" style={{ marginBottom: 12 }}>
              <Icon.Heart />
              <Icon.Heart />
              <Icon.Heart />
            </div>
            <h2>{t.memory.won}</h2>
            <p className="ko" style={{ color: "var(--text-rose-soft)", marginBottom: 12 }}>{t.memory.wonSub}</p>
            <div className="stats">
              <div className="stat-block">
                <div className="value">{formatTime(elapsed)}</div>
                <div className="label">{t.memory.time}</div>
              </div>
              <div className="stat-block">
                <div className="value">{attempts}</div>
                <div className="label">{t.memory.attempts}</div>
              </div>
            </div>
            <button className="btn-primary" onClick={restart}>{t.memory.restart}</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.MemoryGame = MemoryGame;
