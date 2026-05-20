// ============================================
// SUIKA — Matter.js merge game
// ============================================

const SUIKA_W = 360;
const SUIKA_H = 520;
const DANGER_Y = 70;

// 8 levels: [radius, points]
const LEVELS = [
  { r: 18, pts: 1 },
  { r: 25, pts: 3 },
  { r: 33, pts: 6 },
  { r: 42, pts: 10 },
  { r: 52, pts: 15 },
  { r: 62, pts: 21 },
  { r: 74, pts: 28 },
  { r: 88, pts: 36 },
];

// pink palette across levels (light → vivid)
const LEVEL_COLORS = [
  "#FFE4EC", "#FFCFDD", "#FFB3CC", "#FF9DBF",
  "#FF85AF", "#FF6B9D", "#FF5191", "#E63D7F",
];

// Render a pink circle "Taeyang-photo placeholder" sprite via canvas dataURL
function makeLevelTexture(level) {
  const r = LEVELS[level].r;
  const size = r * 2 + 8;
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = size * 2; // hi-dpi
  const ctx = cnv.getContext("2d");
  ctx.scale(2, 2);

  const cx = size / 2;
  const cy = size / 2;
  const color = LEVEL_COLORS[level];

  // soft shadow
  ctx.beginPath();
  ctx.arc(cx, cy + 2, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,107,157,0.25)";
  ctx.fill();

  // base gradient
  const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.4, r * 0.2, cx, cy, r);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, shadeColor(color, -25));
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // white inner ring
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // diagonal stripe pattern (placeholder look)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  for (let i = -size; i < size * 2; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }
  ctx.restore();

  // level label
  ctx.fillStyle = "white";
  ctx.font = `600 ${Math.max(10, r * 0.55)}px "Fredoka", "Nunito", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (level === 7) {
    ctx.font = `600 ${Math.max(10, r * 0.32)}px "Fredoka", "Nunito", sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 3;
    ctx.fillText("TAEYANG!", cx, cy);
  } else {
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 3;
    ctx.fillText(String(level + 1), cx, cy);
  }
  ctx.shadowBlur = 0;

  return cnv.toDataURL();
}

function shadeColor(hex, percent) {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

function SuikaGame({ setRoute }) {
  const { t, lang } = useLang();
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const engineRef = React.useRef(null);
  const renderRef = React.useRef(null);
  const runnerRef = React.useRef(null);
  const droppingLockRef = React.useRef(false);
  const nextLevelRef = React.useRef(0);
  const aimXRef = React.useRef(SUIKA_W / 2);

  const [score, setScore] = React.useState(0);
  const [best, setBest] = React.useState(() => {
    try { return parseInt(localStorage.getItem("taeyang.suika.best") || "0", 10); } catch { return 0; }
  });
  const [nextLevel, setNextLevel] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [aimX, setAimX] = React.useState(SUIKA_W / 2);

  // Pre-make textures once
  const textures = React.useMemo(() => LEVELS.map((_, i) => makeLevelTexture(i)), []);

  const pickNextLevel = () => Math.floor(Math.random() * 4); // levels 0-3 spawn

  const dropBall = (level, x) => {
    if (!engineRef.current) return;
    const { Bodies, Composite } = Matter;
    const r = LEVELS[level].r;
    const clampedX = Math.max(r + 2, Math.min(SUIKA_W - r - 2, x));
    const body = Bodies.circle(clampedX, 30, r, {
      restitution: 0.15,
      friction: 0.4,
      frictionAir: 0.002,
      density: 0.001,
      render: {
        sprite: {
          texture: textures[level],
          xScale: 0.5,
          yScale: 0.5,
        },
      },
      label: `level-${level}`,
      plugin: { level, mergedAt: 0, spawnedAt: Date.now() },
    });
    Composite.add(engineRef.current.world, body);
  };

  const startGame = () => {
    if (!containerRef.current) return;
    const {
      Engine, Render, Runner, Bodies, Composite, Events,
    } = Matter;

    // Tear down anything previous
    if (renderRef.current) {
      Render.stop(renderRef.current);
      if (renderRef.current.canvas) renderRef.current.canvas.remove();
      renderRef.current.textures = {};
    }
    if (runnerRef.current) Runner.stop(runnerRef.current);
    if (engineRef.current) Composite.clear(engineRef.current.world, false, true);

    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const render = Render.create({
      element: containerRef.current,
      engine,
      options: {
        width: SUIKA_W,
        height: SUIKA_H,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    const runner = Runner.create();

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;
    canvasRef.current = render.canvas;

    // Make canvas fill container responsively
    render.canvas.style.position = "absolute";
    render.canvas.style.inset = "0";
    render.canvas.style.width = "100%";
    render.canvas.style.height = "100%";

    // Walls
    const wallOpts = { isStatic: true, render: { fillStyle: "transparent" } };
    Composite.add(engine.world, [
      Bodies.rectangle(SUIKA_W / 2, SUIKA_H + 10, SUIKA_W + 40, 20, { ...wallOpts, render: { fillStyle: "#FFB3CC" } }),
      Bodies.rectangle(-10, SUIKA_H / 2, 20, SUIKA_H + 40, wallOpts),
      Bodies.rectangle(SUIKA_W + 10, SUIKA_H / 2, 20, SUIKA_H + 40, wallOpts),
    ]);

    Render.run(render);
    Runner.run(runner, engine);

    // Collisions → merges
    Events.on(engine, "collisionStart", (e) => {
      for (const pair of e.pairs) {
        const a = pair.bodyA, b = pair.bodyB;
        if (!a.plugin || !b.plugin) continue;
        if (a.isStatic || b.isStatic) continue;
        if (a.plugin.merged || b.plugin.merged) continue;
        if (a.plugin.level !== b.plugin.level) continue;
        if (a.plugin.level >= LEVELS.length - 1) continue;

        a.plugin.merged = true;
        b.plugin.merged = true;
        const newLevel = a.plugin.level + 1;
        const mx = (a.position.x + b.position.x) / 2;
        const my = (a.position.y + b.position.y) / 2;
        Composite.remove(engine.world, a);
        Composite.remove(engine.world, b);
        const r = LEVELS[newLevel].r;
        const merged = Bodies.circle(mx, my, r, {
          restitution: 0.15,
          friction: 0.4,
          frictionAir: 0.002,
          density: 0.001,
          render: {
            sprite: {
              texture: textures[newLevel],
              xScale: 0.5,
              yScale: 0.5,
            },
          },
          label: `level-${newLevel}`,
          plugin: { level: newLevel, mergedAt: Date.now(), spawnedAt: Date.now() },
        });
        Composite.add(engine.world, merged);
        setScore(s => s + LEVELS[newLevel].pts);
      }
    });

    // Game over check — any body resting above danger line
    Events.on(engine, "afterUpdate", () => {
      const bodies = Composite.allBodies(engine.world);
      for (const body of bodies) {
        if (body.isStatic) continue;
        if (!body.plugin) continue;
        const age = Date.now() - (body.plugin.spawnedAt || 0);
        if (age < 1200) continue; // grace period after spawn
        if (body.position.y - LEVELS[body.plugin.level].r < DANGER_Y &&
            Math.abs(body.velocity.y) < 0.5) {
          setGameOver(true);
          return;
        }
      }
    });

    // Init: pick first next level
    nextLevelRef.current = pickNextLevel();
    setNextLevel(nextLevelRef.current);
  };

  const restart = () => {
    setScore(0);
    setGameOver(false);
    droppingLockRef.current = false;
    startGame();
  };

  // Init on mount
  React.useEffect(() => {
    startGame();
    return () => {
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas) renderRef.current.canvas.remove();
      }
    };
    // eslint-disable-next-line
  }, []);

  // Persist best
  React.useEffect(() => {
    if (score > best) {
      setBest(score);
      try { localStorage.setItem("taeyang.suika.best", String(score)); } catch {}
    }
  }, [score, best]);

  // Handle pointer to drop
  const handleDrop = (e) => {
    if (gameOver || droppingLockRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xCss = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
    const x = (xCss / rect.width) * SUIKA_W;
    droppingLockRef.current = true;
    dropBall(nextLevelRef.current, x);
    // Pick next
    nextLevelRef.current = pickNextLevel();
    setNextLevel(nextLevelRef.current);
    setTimeout(() => { droppingLockRef.current = false; }, 450);
  };

  const handleMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xCss = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left;
    const x = (xCss / rect.width) * SUIKA_W;
    aimXRef.current = Math.max(LEVELS[nextLevelRef.current].r + 2, Math.min(SUIKA_W - LEVELS[nextLevelRef.current].r - 2, x));
    setAimX(aimXRef.current);
  };

  return (
    <div className="page">
      <button className="back-link" onClick={() => setRoute("games")}>
        <Icon.ChevronLeft />
        <span>{t.suika.back}</span>
      </button>

      <div className="game-header">
        <h1>{t.suika.title}</h1>
        <div className="sub ko">{t.suika.subtitle}</div>
      </div>

      <div className="suika-screen">
        <div className="suika-wrap">
          <div
            ref={containerRef}
            className="suika-canvas-container"
            onClick={handleDrop}
            onMouseMove={handleMove}
            onTouchStart={handleDrop}
            onTouchMove={handleMove}
            style={{ touchAction: "none" }}
          >
            <div className="suika-danger" style={{ top: `${(DANGER_Y / SUIKA_H) * 100}%` }} />
            {/* Aim marker */}
            {!gameOver && (
              <div
                className="suika-next-marker"
                style={{ left: `${(aimX / SUIKA_W) * 100}%` }}
              >
                <div
                  style={{
                    width: `${(LEVELS[nextLevel].r * 2) / SUIKA_W * 100}%`,
                    aspectRatio: 1,
                    minWidth: 30,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, white, ${LEVEL_COLORS[nextLevel]} 60%, ${shadeColor(LEVEL_COLORS[nextLevel], -25)})`,
                    opacity: 0.85,
                    boxShadow: "0 4px 12px rgba(255,107,157,0.4)",
                  }}
                />
              </div>
            )}
            {gameOver && (
              <div className="game-over-overlay">
                <div className="game-over-card">
                  <h3>{t.suika.gameOver}</h3>
                  <p className="ko" style={{ color: "var(--text-rose-soft)", marginBottom: 16 }}>{t.suika.gameOverSub}</p>
                  <div style={{ fontFamily: "Fredoka, Nunito, sans-serif", fontWeight: 600, fontSize: 30, color: "var(--text-rose)" }}>
                    {score} <span style={{ fontSize: 14, color: "var(--text-rose-soft)" }}>pts</span>
                  </div>
                  <button className="btn-primary" onClick={restart} style={{ marginTop: 16 }}>
                    {t.suika.restart}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="suika-sidebar">
          <div className="score-box">
            <div className="label">{t.suika.score}</div>
            <div className="value">{score}</div>
          </div>
          <div className="score-box">
            <div className="label">{t.suika.best}</div>
            <div className="value" style={{ fontSize: 26 }}>{best}</div>
          </div>
          <div className="next-preview">
            <div className="label" style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--pink-hot)", fontWeight: 700 }}>{t.suika.next}</div>
            <div className="next-preview-circle" style={{
              width: Math.max(36, LEVELS[nextLevel].r * 1.2),
              height: Math.max(36, LEVELS[nextLevel].r * 1.2),
              background: `radial-gradient(circle at 30% 30%, white, ${LEVEL_COLORS[nextLevel]} 60%, ${shadeColor(LEVEL_COLORS[nextLevel], -25)})`,
              fontSize: Math.max(12, LEVELS[nextLevel].r * 0.55),
            }}>
              {nextLevel + 1}
            </div>
          </div>
          <button className="btn-primary" onClick={restart} style={{ width: "100%" }}>
            {t.suika.restart}
          </button>
          <div className="level-legend">
            <h4>{t.suika.legend}</h4>
            <div className="level-legend-grid">
              {LEVELS.map((lvl, i) => (
                <div
                  key={i}
                  className="level-legend-dot"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, white, ${LEVEL_COLORS[i]} 60%, ${shadeColor(LEVEL_COLORS[i], -25)})`,
                  }}
                  title={`Lv ${i + 1} = ${lvl.pts}pt`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.SuikaGame = SuikaGame;
