// ============================================
// Profile page — merged Home + About into one fun page
// ============================================

function HomePage() {
  const { t, lang } = useLang();

  return (
    <div className="page">
      {/* HERO with mascot decorations */}
      <section className="hero">
        <div className="hero-mascots">
          <div className="hero-mascot left">
            <SunnyMascot size={64} mood="happy" />
          </div>
          <div className="hero-avatar">
            <PhotoPlaceholder shape="circle" aspectRatio="1" label={t.home.photoLabel} />
            <div className="hero-paw paw-tl"><Icon.Paw /></div>
            <div className="hero-paw paw-br"><Icon.Paw /></div>
          </div>
          <div className="hero-mascot right">
            <SunnyMascot size={64} mood="pig" />
          </div>
        </div>
        <h1 className="hero-name">{lang === "en" ? "KIM TAEYANG" : "김태양"}</h1>
        <div className="hero-subtitle">{t.home.subtitle}</div>
      </section>

      {/* PROFILE FACTS */}
      <h2 className="section-title">
        <Icon.Cat style={{ width: 28, height: 28, color: "var(--pink-soft)" }} />
        {t.home.factsTitle}
      </h2>
      <p className="section-subtitle ko">{t.home.factsSubtitle}</p>

      <div className="fact-grid">
        <FactCard icon={<Icon.Cake />} labelEn="Birthday" labelKo="생일"
          valueEn={TAEYANG_FACTS.born.en} valueKo={TAEYANG_FACTS.born.ko} />
        <FactCard icon={<Icon.Mic />} labelEn="Group" labelKo="그룹"
          valueEn={TAEYANG_FACTS.group.en} valueKo={TAEYANG_FACTS.group.ko} />
        <FactCard icon={<Icon.Ruler />} labelEn="Height" labelKo="키"
          valueEn={TAEYANG_FACTS.height.en} valueKo={TAEYANG_FACTS.height.ko} />
        <FactCard icon={<Icon.Tag />} labelEn="MBTI" labelKo="MBTI"
          valueEn={TAEYANG_FACTS.mbti.en} valueKo={TAEYANG_FACTS.mbti.ko} />
        <FactCard icon={<Icon.Sun />} labelEn="Nickname" labelKo="별명"
          valueEn={TAEYANG_FACTS.nickname.en} valueKo={TAEYANG_FACTS.nickname.ko} />
        <FactCard icon={<Icon.Music />} labelEn="Debut" labelKo="데뷔"
          valueEn={TAEYANG_FACTS.debut.en} valueKo={TAEYANG_FACTS.debut.ko} />
      </div>

      {/* FULL BIO TABLE */}
      <h2 className="section-title">
        <Icon.Pig style={{ width: 26, height: 26, color: "var(--pink-soft)" }} />
        {t.home.bio}
      </h2>
      <p className="section-subtitle ko">{t.home.bioSub}</p>

      <div className="about-grid">
        <PhotoPlaceholder className="about-photo" aspectRatio="3 / 4" label={t.home.photoLabel} />
        <div className="bio-table">
          <BioRow labelEn="Full Name" labelKo="본명" v={TAEYANG_FACTS.fullName} />
          <BioRow labelEn="Born" labelKo="생일" v={TAEYANG_FACTS.born} />
          <BioRow labelEn="Birthplace" labelKo="출생지" v={TAEYANG_FACTS.birthplace} />
          <BioRow labelEn="Label" labelKo="소속사" v={TAEYANG_FACTS.label} />
          <BioRow labelEn="Height" labelKo="키" v={TAEYANG_FACTS.height} />
          <BioRow labelEn="MBTI" labelKo="MBTI" v={TAEYANG_FACTS.mbti} />
          <BioRow labelEn="Nickname" labelKo="별명" v={TAEYANG_FACTS.nickname} />
          <BioRow labelEn="Debut" labelKo="데뷔" v={TAEYANG_FACTS.debut} />
        </div>
      </div>

      {/* TIMELINE */}
      <h2 className="section-title">
        <Icon.Star />
        {t.home.timeline}
      </h2>
      <p className="section-subtitle ko">2023 → 2025</p>
      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-text">{lang === "en" ? item.en : item.ko}</div>
          </div>
        ))}
      </div>

      {/* PERSONALITY */}
      <h2 className="section-title">
        <Icon.Heart />
        {t.home.personality}
      </h2>
      <p className="section-subtitle ko">{t.home.personalitySub}</p>
      <div className="chip-row">
        {PERSONALITY_TRAITS.map((p, i) => (
          <span className="chip" key={i}>
            {lang === "en" ? p.en : p.ko}
          </span>
        ))}
      </div>

      {/* DID YOU KNOW carousel */}
      <h2 className="section-title" style={{ marginTop: 48 }}>
        <Icon.Sparkle />
        {t.home.didYouKnow}
      </h2>
      <p className="section-subtitle ko">{t.home.didYouKnowSub}</p>
      <DidYouKnowCarousel />

      <footer className="footer">
        <Icon.Paw />
        <span>{t.home.footer}</span>
        <Icon.Paw />
      </footer>
    </div>
  );
}

function FactCard({ icon, labelEn, labelKo, valueEn, valueKo }) {
  const { lang } = useLang();
  return (
    <div className="fact-card">
      <div className="fact-label">
        {icon}
        <span>{lang === "en" ? labelEn : labelKo}</span>
      </div>
      <div className="fact-value">{lang === "en" ? valueEn : valueKo}</div>
    </div>
  );
}

function BioRow({ labelEn, labelKo, v }) {
  const { lang } = useLang();
  return (
    <div className="bio-row">
      <div className="bio-key">{lang === "en" ? labelEn : labelKo}</div>
      <div className="bio-value">{lang === "en" ? v.en : v.ko}</div>
    </div>
  );
}

function DidYouKnowCarousel() {
  const { lang } = useLang();
  const [idx, setIdx] = React.useState(0);
  const intervalRef = React.useRef(null);

  const next = () => setIdx(i => (i + 1) % DID_YOU_KNOW.length);
  const prev = () => setIdx(i => (i - 1 + DID_YOU_KNOW.length) % DID_YOU_KNOW.length);

  React.useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const restartTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  const fact = DID_YOU_KNOW[idx];
  return (
    <div className="carousel">
      <div className="carousel-fact" key={idx + "-" + lang}>
        <div>{lang === "en" ? fact.en : fact.ko}</div>
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => { prev(); restartTimer(); }} aria-label="Previous">
          <Icon.ChevronLeft />
        </button>
        <div className="carousel-dots">
          {DID_YOU_KNOW.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === idx ? "active" : ""}`}
              onClick={() => { setIdx(i); restartTimer(); }}
              aria-label={`Fact ${i + 1}`}
            />
          ))}
        </div>
        <button className="carousel-btn" onClick={() => { next(); restartTimer(); }} aria-label="Next">
          <Icon.ChevronRight />
        </button>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
