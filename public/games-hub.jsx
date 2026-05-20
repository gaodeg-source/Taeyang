// ============================================
// Games hub page
// ============================================

function GamesPage({ setRoute }) {
  const { t, lang } = useLang();

  const games = [
    { id: "game-suika", name: t.games.g1.name, desc: t.games.g1.desc },
    { id: "game-quiz",  name: t.games.g2.name, desc: t.games.g2.desc },
    { id: "game-memory",name: t.games.g3.name, desc: t.games.g3.desc },
  ];

  return (
    <div className="page">
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 className="section-title" style={{ justifyContent: "center", fontSize: "clamp(32px, 5vw, 48px)" }}>
          <Icon.Sparkle />
          {t.games.title}
          <Icon.Sparkle />
        </h1>
        <p className="section-subtitle ko" style={{ marginTop: 6 }}>{t.games.subtitle}</p>
      </div>

      <div className="games-grid">
        {games.map(g => (
          <div className="game-card" key={g.id}>
            <PhotoPlaceholder
              className="game-card-photo"
              aspectRatio="4 / 3"
              label={lang === "en" ? "Game preview" : "게임 미리보기"}
            />
            <div className="game-card-body">
              <h3 className="game-card-title">{g.name}</h3>
              <p className="game-card-desc">{g.desc}</p>
              <button className="btn-primary" onClick={() => setRoute(g.id)}>
                {t.games.play}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.GamesPage = GamesPage;
