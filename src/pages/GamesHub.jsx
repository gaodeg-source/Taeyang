import { Link } from "react-router-dom";
import { useLang } from "../LangContext";
import "./GamesHub.css";

const games = [
  {
    path: "/games/suika",
    icon: "☀️",
    nameKey: "game1_name",
    descKey: "game1_desc",
    color: "#FFD700",
  },
  {
    path: "/games/quiz",
    icon: "🎯",
    nameKey: "game2_name",
    descKey: "game2_desc",
    color: "#FF6B00",
  },
  {
    path: "/games/memory",
    icon: "🃏",
    nameKey: "game3_name",
    descKey: "game3_desc",
    color: "#FFA500",
  },
];

export default function GamesHub() {
  const { t } = useLang();
  return (
    <main className="page games-hub-page">
      <div className="hub-container">
        <h1 className="hub-title">{t("games_title")}</h1>
        <p className="hub-sub">{t("games_sub")}</p>

        <div className="games-grid">
          {games.map((g, i) => (
            <Link
              to={g.path}
              className="game-card"
              key={i}
              style={{ animationDelay: `${i * 0.12}s`, "--card-color": g.color }}
            >
              <div className="game-card-glow" />
              <div className="game-icon">{g.icon}</div>
              <h2 className="game-name">{t(g.nameKey)}</h2>
              <p className="game-desc">{t(g.descKey)}</p>
              <span className="game-cta">{t("play_now")}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
