import { useState, useEffect } from "react";
import { useLang } from "../LangContext";
import "./Home.css";

function SunHero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-rays">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="ray"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
          />
        ))}
      </div>
      <div className="hero-content">
        <p className="hero-label">NEWBEAT • 뉴비트</p>
        <h1 className="hero-title">{t("home_hero_name")}</h1>
        <p className="hero-sun-emoji">☀️</p>
        <p className="hero-sub">{t("home_hero_sub")}</p>
      </div>
    </section>
  );
}

function FactCards() {
  const { t } = useLang();
  const facts = [
    { icon: "🎂", label: t("home_birthday"), val: t("home_birthday_val") },
    { icon: "🎵", label: t("home_group"), val: t("home_group_val") },
    { icon: "📏", label: t("home_height"), val: t("home_height_val") },
    { icon: "🧠", label: t("home_mbti"), val: t("home_mbti_val") },
    { icon: "☀️", label: t("home_nickname"), val: t("home_nickname_val") },
    { icon: "🚀", label: t("home_debut"), val: t("home_debut_val") },
  ];

  return (
    <section className="facts-section">
      <h2 className="section-title">{t("home_facts_title")}</h2>
      <div className="facts-grid">
        {facts.map((f, i) => (
          <div className="fact-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="fact-icon">{f.icon}</span>
            <span className="fact-label">{f.label}</span>
            <span className="fact-val">{f.val}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function DidYouKnow() {
  const { t, lang } = useLang();
  const facts = t("home_facts");
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const go = (dir) => {
    setVisible(false);
    setTimeout(() => {
      setIdx((prev) => (prev + dir + facts.length) % facts.length);
      setVisible(true);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <section className="dyk-section">
      <h2 className="section-title">{t("home_didyouknow")}</h2>
      <div className="dyk-card">
        <div className={`dyk-text ${visible ? "visible" : "hidden"}`}>
          {facts[idx]}
        </div>
        <div className="dyk-nav">
          <button className="dyk-btn" onClick={() => go(-1)}>←</button>
          <div className="dyk-dots">
            {facts.map((_, i) => (
              <button
                key={i}
                className={`dyk-dot ${i === idx ? "active" : ""}`}
                onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 200); }}
              />
            ))}
          </div>
          <button className="dyk-btn" onClick={() => go(1)}>→</button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <main className="page home-page">
      <SunHero />
      <FactCards />
      <DidYouKnow />
      <footer className="site-footer">
        <p>{t("home_footer")}</p>
      </footer>
    </main>
  );
}
