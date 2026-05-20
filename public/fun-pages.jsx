// ============================================
// PET SUNNY — virtual cat/pig hybrid pet
// ============================================

const PET_KEY = "taeyang.pet.state";
const PET_TICK_MS = 4000;

function loadPet() {
  try {
    const raw = localStorage.getItem(PET_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { happy: 80, hunger: 60, energy: 80, lastTick: Date.now() };
}
function savePet(s) {
  try { localStorage.setItem(PET_KEY, JSON.stringify(s)); } catch {}
}

function clampStat(n) { return Math.max(0, Math.min(100, n)); }

function PetPage() {
  const { t, lang } = useLang();
  const [pet, setPet] = React.useState(loadPet);
  const [mood, setMood] = React.useState("happy"); // happy | pig | sleeping
  const [reaction, setReaction] = React.useState({ text: "", id: 0 });
  const [bouncing, setBouncing] = React.useState(false);
  const [hearts, setHearts] = React.useState([]);
  const reactTimerRef = React.useRef(null);

  // Persist
  React.useEffect(() => { savePet(pet); }, [pet]);

  // Decay stats over time
  React.useEffect(() => {
    const id = setInterval(() => {
      setPet(p => ({
        happy: clampStat(p.happy - 1.5),
        hunger: clampStat(p.hunger - 2),
        energy: clampStat(p.energy - 1),
        lastTick: Date.now(),
      }));
    }, PET_TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Idle status message
  const idleStatus = React.useMemo(() => {
    if (pet.energy < 25) return t.pet.reactions.sleepy;
    if (pet.hunger < 25) return t.pet.reactions.hungry;
    if (pet.happy < 35) return t.pet.reactions.bored;
    return null;
  }, [pet, t]);

  const flashReaction = (text) => {
    clearTimeout(reactTimerRef.current);
    setReaction({ text, id: Date.now() });
    setBouncing(true);
    reactTimerRef.current = setTimeout(() => setBouncing(false), 600);
  };

  const spawnHearts = (count = 3) => {
    const newOnes = Array.from({ length: count }, () => ({
      id: Math.random(),
      left: 40 + Math.random() * 20,
      dx: -30 + Math.random() * 60,
    }));
    setHearts(h => [...h, ...newOnes]);
    setTimeout(() => {
      setHearts(h => h.filter(x => !newOnes.some(n => n.id === x.id)));
    }, 1500);
  };

  const doPet = () => {
    setMood("happy");
    setPet(p => ({ ...p, happy: clampStat(p.happy + 12) }));
    flashReaction(t.pet.reactions.pet);
    spawnHearts(4);
  };
  const doFish = () => {
    setMood("happy");
    setPet(p => ({ ...p, hunger: clampStat(p.hunger + 25), happy: clampStat(p.happy + 6) }));
    flashReaction(t.pet.reactions.feedFish);
  };
  const doCookie = () => {
    setMood("pig");
    setPet(p => ({ ...p, hunger: clampStat(p.hunger + 30), happy: clampStat(p.happy + 8) }));
    flashReaction(t.pet.reactions.feedCookie);
    setTimeout(() => setMood("happy"), 2200);
  };
  const doSleep = () => {
    setMood("sleeping");
    setPet(p => ({ ...p, energy: clampStat(p.energy + 30) }));
    flashReaction(t.pet.reactions.sleep);
    setTimeout(() => setMood("happy"), 2400);
  };
  const reset = () => {
    setPet({ happy: 80, hunger: 60, energy: 80, lastTick: Date.now() });
    setMood("happy");
    setReaction({ text: "", id: 0 });
  };

  return (
    <div className="page">
      <div className="game-header">
        <h1>{t.pet.title}</h1>
        <div className="sub ko">{t.pet.subtitle}</div>
      </div>

      <div className="pet-screen">
        <div className="pet-stage">
          {/* Hearts spawn on pet */}
          {hearts.map(h => (
            <span key={h.id} className="pet-heart"
              style={{ left: `${h.left}%`, "--dx": `${h.dx}px` }}>
              <Icon.Heart />
            </span>
          ))}

          {/* Big mascot */}
          <div
            className={`pet-mascot mood-${mood} ${bouncing ? "bouncing" : ""}`}
            onClick={doPet}
          >
            {mood === "sleeping" && (
              <span className="pet-zzz"><Icon.Zzz /></span>
            )}
            {mood === "pig"
              ? <Icon.Pig style={{ width: "100%", height: "100%", color: "#FFB3CC" }} />
              : <Icon.Cat style={{ width: "100%", height: "100%", color: "#FFD4E2" }} />}
          </div>

          {reaction.text && (
            <div className="pet-reaction" key={reaction.id}>{reaction.text}</div>
          )}
          {!reaction.text && idleStatus && (
            <div className="pet-reaction idle">{idleStatus}</div>
          )}
        </div>

        <div className="pet-meters">
          <Meter label={t.pet.happiness} value={pet.happy} icon={<Icon.Heart />} />
          <Meter label={t.pet.hunger} value={pet.hunger} icon={<Icon.Cookie />} />
          <Meter label={t.pet.energy} value={pet.energy} icon={<Icon.Sparkle />} />
        </div>

        <div className="pet-actions">
          <button className="pet-btn" onClick={doPet}>
            <span className="pet-btn-icon"><Icon.Paw /></span>
            <span>{t.pet.petAction}</span>
          </button>
          <button className="pet-btn" onClick={doFish}>
            <span className="pet-btn-icon"><Icon.Fish /></span>
            <span>{t.pet.feedFish}</span>
          </button>
          <button className="pet-btn" onClick={doCookie}>
            <span className="pet-btn-icon"><Icon.Cookie /></span>
            <span>{t.pet.feedCookie}</span>
          </button>
          <button className="pet-btn" onClick={doSleep}>
            <span className="pet-btn-icon"><Icon.Zzz /></span>
            <span>{t.pet.sleep}</span>
          </button>
        </div>

        <button className="back-link" onClick={reset} style={{ marginTop: 24 }}>
          {t.pet.reset}
        </button>
      </div>
    </div>
  );
}

function Meter({ label, value, icon }) {
  return (
    <div className="meter">
      <div className="meter-label">
        <span className="meter-icon">{icon}</span>
        <span>{label}</span>
        <span className="meter-value">{Math.round(value)}</span>
      </div>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ============================================
// BIRTHDAY COUNTDOWN — to Dec 6
// ============================================

function nextBirthday(now = new Date()) {
  const year = now.getFullYear();
  let target = new Date(year, 11, 6, 0, 0, 0, 0); // Dec is month 11
  if (target.getTime() < now.getTime() - 24 * 3600 * 1000) {
    // already passed (more than a day ago) — next year
    target = new Date(year + 1, 11, 6, 0, 0, 0, 0);
  }
  return target;
}

function isTodayDec6(now = new Date()) {
  return now.getMonth() === 11 && now.getDate() === 6;
}

function ageOn(target) {
  // born Dec 6 2006
  return target.getFullYear() - 2006;
}

function BirthdayPage() {
  const { t, lang } = useLang();
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const today = isTodayDec6(now);
  const target = nextBirthday(now);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const age = ageOn(target);

  return (
    <div className="page">
      <div className="game-header">
        <h1>{today ? t.birthday.todayTitle : t.birthday.title}</h1>
        <div className="sub ko">{today ? t.birthday.todaySub : t.birthday.subtitle}</div>
      </div>

      <div className="birthday-screen">
        <div className="birthday-card">
          <div className="birthday-mascots">
            <SunnyMascot size={80} mood="happy" />
            <div className="birthday-cake">
              <Icon.Cake style={{ width: 64, height: 64, color: "var(--pink-hot)" }} />
            </div>
            <SunnyMascot size={80} mood="pig" />
          </div>

          {today ? (
            <div className="birthday-today">
              <div className="birthday-big">{age}</div>
              <div className="birthday-big-sub">
                {lang === "en" ? `Sunny turns ${age} today!` : `오늘 써니는 ${age}살이 돼요!`}
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="birthday-line">{t.birthday.until}</div>
              <div className="countdown-grid">
                <CountUnit n={days} label={t.birthday.days} />
                <CountUnit n={hours} label={t.birthday.hours} />
                <CountUnit n={mins} label={t.birthday.minutes} />
                <CountUnit n={secs} label={t.birthday.seconds} />
              </div>
              <div className="birthday-line birthday-turning">
                {lang === "en"
                  ? `Sunny is turning ${age} this year!`
                  : `써니는 올해 ${age}살이 돼요!`}
              </div>
            </React.Fragment>
          )}

          <div className="birthday-message">{t.birthday.message}</div>
        </div>
      </div>
    </div>
  );
}

function CountUnit({ n, label }) {
  return (
    <div className="count-unit">
      <div className="count-num">{String(n).padStart(2, "0")}</div>
      <div className="count-label">{label}</div>
    </div>
  );
}

window.PetPage = PetPage;
window.BirthdayPage = BirthdayPage;
