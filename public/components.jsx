// ============================================
// Shared components: icons, PhotoPlaceholder, Navbar, LandingPopup
// ============================================

// --- Inline SVG Icons (no emoji, no external libs) ---
const Icon = {
  Heart: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4c4 0 6.5 4 5 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  ),
  HeartOutline: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4c4 0 6.5 4 5 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  ),
  Camera: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Sparkle: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
    </svg>
  ),
  ChevronLeft: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3 7 7 .5-5.5 4.7L18 22l-6-3.7L6 22l1.5-7.8L2 9.5 9 9l3-7z" />
    </svg>
  ),
  Ribbon: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 12c-2-2-5-3-7-1 0 3 3 4 5 4l-2 4h8l-2-4c2 0 5-1 5-4-2-2-5-1-7 1z"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),
  Cake: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 14h18v6H3z" />
      <path d="M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M8 8V5M12 8V5M16 8V5" />
    </svg>
  ),
  Music: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Ruler: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 17l14-14 4 4-14 14z" /><path d="M7 9l2 2M10 6l2 2M13 12l2 2M16 9l2 2" />
    </svg>
  ),
  Sun: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Mic: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  ),
  Tag: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 12l-8 8-9-9V3h8z" /><circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  ),
  // ---- ANIMALS ----
  // Cat face (his official character)
  Cat: (props) => (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      {/* ears */}
      <path d="M9 8 L13 18 L17 14 Z" fill="currentColor" />
      <path d="M31 8 L27 18 L23 14 Z" fill="currentColor" />
      <path d="M11 10 L14 16 L16.5 13.5 Z" fill="#FFB3CC" opacity="0.7" />
      <path d="M29 10 L26 16 L23.5 13.5 Z" fill="#FFB3CC" opacity="0.7" />
      {/* head */}
      <circle cx="20" cy="22" r="12" fill="currentColor" />
      {/* eyes — closed happy curves */}
      <path d="M14 21 q2 2 4 0" stroke="#4A3742" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M22 21 q2 2 4 0" stroke="#4A3742" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* nose */}
      <path d="M19 24 L21 24 L20 25.2 Z" fill="#FF7AAE" />
      {/* mouth */}
      <path d="M20 25.2 Q18.5 27 17.5 26.2 M20 25.2 Q21.5 27 22.5 26.2" stroke="#4A3742" strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* whiskers */}
      <path d="M9 23 L13 23.5 M9 25 L13 25 M27 23.5 L31 23 M27 25 L31 25" stroke="#4A3742" strokeWidth="0.7" strokeLinecap="round" />
      {/* cheek blush */}
      <circle cx="13" cy="25" r="1.8" fill="#FF94B8" opacity="0.5" />
      <circle cx="27" cy="25" r="1.8" fill="#FF94B8" opacity="0.5" />
    </svg>
  ),
  // Pig face
  Pig: (props) => (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      {/* ears */}
      <path d="M10 11 Q12 7 16 10 Q14 13 11 14 Z" fill="currentColor" />
      <path d="M30 11 Q28 7 24 10 Q26 13 29 14 Z" fill="currentColor" />
      {/* head */}
      <circle cx="20" cy="22" r="12" fill="currentColor" />
      {/* eyes — closed happy curves */}
      <path d="M14 20 q1.5 1.8 3.5 0" stroke="#4A3742" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M22.5 20 q1.5 1.8 3.5 0" stroke="#4A3742" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* snout */}
      <ellipse cx="20" cy="25" rx="5.5" ry="4" fill="#FFB3CC" stroke="#4A3742" strokeWidth="0.6" />
      <ellipse cx="18" cy="25" rx="0.8" ry="1.4" fill="#4A3742" />
      <ellipse cx="22" cy="25" rx="0.8" ry="1.4" fill="#4A3742" />
      {/* cheek blush */}
      <circle cx="13" cy="25" r="1.8" fill="#FF7AAE" opacity="0.5" />
      <circle cx="27" cy="25" r="1.8" fill="#FF7AAE" opacity="0.5" />
    </svg>
  ),
  // Cat paw print
  Paw: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <ellipse cx="12" cy="15" rx="4.5" ry="4" />
      <ellipse cx="6" cy="10" rx="2" ry="2.5" />
      <ellipse cx="9" cy="6" rx="1.8" ry="2.3" />
      <ellipse cx="15" cy="6" rx="1.8" ry="2.3" />
      <ellipse cx="18" cy="10" rx="2" ry="2.5" />
    </svg>
  ),
  // Cookie (food for pet)
  Cookie: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" fill="#D4A574" stroke="#8B5E34" strokeWidth="0.5" />
      <circle cx="8" cy="9" r="1.2" fill="#5C3A1E" />
      <circle cx="14" cy="8" r="1" fill="#5C3A1E" />
      <circle cx="15" cy="14" r="1.3" fill="#5C3A1E" />
      <circle cx="9" cy="15" r="0.9" fill="#5C3A1E" />
      <circle cx="12" cy="12" r="0.8" fill="#5C3A1E" />
    </svg>
  ),
  // Fish (food for cat)
  Fish: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 12 Q6 8 10 8 Q15 8 18 10 L21 6 L21 18 L18 14 Q15 16 10 16 Q6 16 3 12 Z" fill="#FFB3CC" stroke="#FF7AAE" strokeWidth="0.8" />
      <circle cx="16" cy="11" r="1" fill="#4A3742" />
      <path d="M11 11 Q12 12 11 13 M13 11 Q14 12 13 13" stroke="#FF7AAE" strokeWidth="0.6" fill="none" />
    </svg>
  ),
  Zzz: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 8 H14 L6 18 H14" />
    </svg>
  ),
};

// Subtle blink animation hook — toggles a state every few seconds so cats appear to blink
function useBlink(period = 4500) {
  const [blink, setBlink] = React.useState(false);
  React.useEffect(() => {
    let timeout;
    const cycle = () => {
      setBlink(true);
      timeout = setTimeout(() => {
        setBlink(false);
        timeout = setTimeout(cycle, period - 200 + Math.random() * 1500);
      }, 180);
    };
    timeout = setTimeout(cycle, period);
    return () => clearTimeout(timeout);
  }, [period]);
  return blink;
}

// SunnyMascot — combined cat/pig idle mascot. Floats and blinks. Click → reaction.
function SunnyMascot({ size = 120, mood = "happy", onClick, style }) {
  const blink = useBlink(4200);
  const isCat = mood !== "pig";
  return (
    <div
      className={`sunny-mascot mood-${mood} ${blink ? "blinking" : ""}`}
      onClick={onClick}
      style={{ width: size, height: size, ...style }}
      role={onClick ? "button" : undefined}
    >
      {isCat ? <Icon.Cat style={{ width: "100%", height: "100%", color: "#FFD4E2" }} />
             : <Icon.Pig style={{ width: "100%", height: "100%", color: "#FFB3CC" }} />}
    </div>
  );
}

window.useBlink = useBlink;
window.SunnyMascot = SunnyMascot;

// --- Photo Placeholder ---
function PhotoPlaceholder({ shape = "rect", aspectRatio, width, height, label, style, className = "" }) {
  const { t } = useLang();
  const finalLabel = label !== undefined ? label : t.home.photoLabel;
  const mergedStyle = {
    aspectRatio: aspectRatio,
    width: width,
    height: height,
    ...style,
  };
  return (
    <div className={`photo-placeholder ${shape === "circle" ? "circle" : ""} ${className}`} style={mergedStyle}>
      <Icon.Camera className="camera-icon" />
      {finalLabel && <div className="label">{finalLabel}</div>}
    </div>
  );
}

// --- Navbar ---
function Navbar({ route, setRoute }) {
  const { lang, setLang, t } = useLang();
  const blink = useBlink(5000);
  const links = [
    { id: "home", label: t.nav.home },
    { id: "games", label: t.nav.games },
    { id: "pet", label: t.nav.pet },
    { id: "birthday", label: t.nav.birthday },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => setRoute("home")} aria-label="Home">
          <span className={`logo-cat ${blink ? "blinking" : ""}`}>
            <Icon.Cat />
          </span>
          <span className="logo-ko ko">태양</span>
        </button>
        <div className="navbar-links">
          {links.map(l => (
            <button
              key={l.id}
              className={`navbar-link ${
                route === l.id ||
                (l.id === "games" && route.startsWith("game-")) ? "active" : ""
              }`}
              onClick={() => setRoute(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button className="lang-toggle" onClick={() => setLang(lang === "en" ? "ko" : "en")}>
            {lang === "en" ? "한국어" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}

// --- Confetti ---
function Confetti() {
  const pieces = React.useMemo(() => {
    const colors = ["#FF6B9D", "#FFB3CC", "#FF8FAB", "#FFC0CB", "#FFFFFF"];
    return Array.from({ length: 50 }, (_, i) => ({
      key: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
      shape: Math.random() < 0.4 ? "circle" : "rect",
    }));
  }, []);
  return (
    <div className="confetti">
      {pieces.map(p => (
        <span
          key={p.key}
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// --- Landing Popup --- always shows both languages
const POPUP_TEXTS = {
  question: { en: "Are you Kim Taeyang?", ko: "당신이 김태양인가요?" },
  yesResponse: { en: "We knew it! Welcome home!", ko: "우리 알았어요! 어서 오세요!" },
  noResponse: { en: "That's okay! You're still our sunshine!", ko: "괜찮아요! 당신도 우리의 태양이에요!" },
  yes: { en: "YES", ko: "네" },
  no: { en: "NO", ko: "아니요" },
};

function LandingPopup({ onClose }) {
  const [stage, setStage] = React.useState("question");
  const closeRef = React.useRef(null);

  const choose = (choice) => {
    setStage(choice);
    const delay = choice === "yes" ? 3000 : 2500;
    closeRef.current = setTimeout(onClose, delay);
  };

  React.useEffect(() => () => clearTimeout(closeRef.current), []);

  return (
    <div className="popup-overlay">
      {stage === "yes" && <Confetti />}
      <div className="popup-card">
        <div className="popup-hearts">
          <Icon.Heart />
          <Icon.Heart />
          <Icon.Heart />
        </div>
        {stage === "question" && (
          <React.Fragment>
            <div className="popup-question">{POPUP_TEXTS.question.en}</div>
            <div className="popup-question-ko">{POPUP_TEXTS.question.ko}</div>
            <div className="popup-buttons">
              <button className="btn-primary" onClick={() => choose("yes")}>
                {POPUP_TEXTS.yes.en} / {POPUP_TEXTS.yes.ko}
              </button>
              <button className="btn-secondary" onClick={() => choose("no")}>
                {POPUP_TEXTS.no.en} / {POPUP_TEXTS.no.ko}
              </button>
            </div>
          </React.Fragment>
        )}
        {stage === "yes" && (
          <React.Fragment>
            <div className="popup-response">{POPUP_TEXTS.yesResponse.en}</div>
            <div className="popup-response-ko">{POPUP_TEXTS.yesResponse.ko}</div>
          </React.Fragment>
        )}
        {stage === "no" && (
          <React.Fragment>
            <div className="popup-response">{POPUP_TEXTS.noResponse.en}</div>
            <div className="popup-response-ko">{POPUP_TEXTS.noResponse.ko}</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

window.Icon = Icon;
window.PhotoPlaceholder = PhotoPlaceholder;
window.Navbar = Navbar;
window.LandingPopup = LandingPopup;
window.Confetti = Confetti;
