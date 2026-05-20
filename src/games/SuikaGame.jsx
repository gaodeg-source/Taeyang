import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";
import { useLang } from "../LangContext";
import "./SuikaGame.css";

const ITEMS = [
  { level: 0, emoji: "✨", label: "Spark",   pts: 1,  r: 18 },
  { level: 1, emoji: "🔥", label: "Flame",   pts: 3,  r: 25 },
  { level: 2, emoji: "💫", label: "Comet",   pts: 6,  r: 33 },
  { level: 3, emoji: "⭐", label: "Star",    pts: 10, r: 42 },
  { level: 4, emoji: "🌟", label: "Shining", pts: 15, r: 52 },
  { level: 5, emoji: "🌙", label: "Moon",    pts: 21, r: 62 },
  { level: 6, emoji: "☀️", label: "Sun",     pts: 28, r: 74 },
  { level: 7, emoji: "🌞", label: "TAEYANG", pts: 36, r: 88 },
];

const CANVAS_W = 360;
const CANVAS_H = 520;
const WALL_T = 40;
const DANGER_Y = 80;

function randomNextLevel() {
  return Math.floor(Math.random() * 4); // only drop 0-3
}

export default function SuikaGame() {
  const { t } = useLang();
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const bodiesRef = useRef(new Map()); // body.id -> level
  const mergeQueueRef = useRef([]);
  const runnerRef = useRef(null);
  const dropXRef = useRef(CANVAS_W / 2);
  const canDropRef = useRef(true);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("suika_best") || 0));
  const [nextLevel, setNextLevel] = useState(randomNextLevel);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const scoreRef = useRef(0);

  const addScore = useCallback((pts) => {
    scoreRef.current += pts;
    setScore(scoreRef.current);
    if (scoreRef.current > Number(localStorage.getItem("suika_best") || 0)) {
      setBest(scoreRef.current);
      localStorage.setItem("suika_best", scoreRef.current);
    }
  }, []);

  const initEngine = useCallback(() => {
    const { Engine, Render, Runner, Bodies, World, Events, Body } = Matter;

    if (renderRef.current) {
      Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
    }
    if (runnerRef.current) Runner.stop(runnerRef.current);

    const engine = Engine.create({ gravity: { y: 1.5 } });
    engineRef.current = engine;
    bodiesRef.current = new Map();
    mergeQueueRef.current = [];
    scoreRef.current = 0;

    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: {
        width: CANVAS_W,
        height: CANVAS_H,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Walls
    const floor = Bodies.rectangle(CANVAS_W / 2, CANVAS_H + WALL_T / 2, CANVAS_W, WALL_T, {
      isStatic: true, label: "wall",
      render: { fillStyle: "rgba(255,215,0,0.15)" },
    });
    const wallL = Bodies.rectangle(-WALL_T / 2, CANVAS_H / 2, WALL_T, CANVAS_H * 2, {
      isStatic: true, label: "wall",
      render: { fillStyle: "rgba(255,215,0,0.15)" },
    });
    const wallR = Bodies.rectangle(CANVAS_W + WALL_T / 2, CANVAS_H / 2, WALL_T, CANVAS_H * 2, {
      isStatic: true, label: "wall",
      render: { fillStyle: "rgba(255,215,0,0.15)" },
    });

    World.add(engine.world, [floor, wallL, wallR]);

    // Collision for merging
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        const lvA = bodiesRef.current.get(bodyA.id);
        const lvB = bodiesRef.current.get(bodyB.id);
        if (lvA !== undefined && lvB !== undefined && lvA === lvB && lvA < 7) {
          mergeQueueRef.current.push([bodyA, bodyB, lvA]);
        }
      });
    });

    // Process merges after each update
    Events.on(engine, "afterUpdate", () => {
      const toMerge = [...mergeQueueRef.current];
      mergeQueueRef.current = [];

      toMerge.forEach(([bA, bB, lv]) => {
        if (!bodiesRef.current.has(bA.id) || !bodiesRef.current.has(bB.id)) return;
        const midX = (bA.position.x + bB.position.x) / 2;
        const midY = (bA.position.y + bB.position.y) / 2;
        World.remove(engine.world, bA);
        World.remove(engine.world, bB);
        bodiesRef.current.delete(bA.id);
        bodiesRef.current.delete(bB.id);

        const newLv = lv + 1;
        const item = ITEMS[newLv];
        const nb = Bodies.circle(midX, midY, item.r, {
          restitution: 0.2,
          friction: 0.5,
          label: `item-${newLv}`,
          render: {
            fillStyle: "transparent",
            strokeStyle: "transparent",
          },
        });
        nb.__level = newLv;
        bodiesRef.current.set(nb.id, newLv);
        World.add(engine.world, nb);
        addScore(item.pts);
      });

      // Game over check
      bodiesRef.current.forEach((lv, id) => {
        const body = engine.world.bodies.find(b => b.id === id);
        if (body && body.position.y < DANGER_Y && !canDropRef.current) {
          setGameOver(true);
        }
      });
    });

    // Custom render: draw emojis
    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      bodiesRef.current.forEach((lv, id) => {
        const body = engine.world.bodies.find(b => b.id === id);
        if (!body) return;
        const { x, y } = body.position;
        const item = ITEMS[lv];
        ctx.save();
        ctx.font = `${item.r * 1.3}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();
      });

      // Danger line
      ctx.save();
      ctx.strokeStyle = "rgba(255,100,100,0.4)";
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, DANGER_Y);
      ctx.lineTo(CANVAS_W, DANGER_Y);
      ctx.stroke();
      ctx.restore();
    });

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
  }, [addScore]);

  const dropItem = useCallback((x) => {
    if (!canDropRef.current || !engineRef.current || gameOver) return;
    canDropRef.current = false;

    const { Bodies, World } = Matter;
    const lv = nextLevel;
    const item = ITEMS[lv];
    const body = Bodies.circle(x, 30, item.r, {
      restitution: 0.2,
      friction: 0.5,
      label: `item-${lv}`,
      render: { fillStyle: "transparent", strokeStyle: "transparent" },
    });
    body.__level = lv;
    bodiesRef.current.set(body.id, lv);
    World.add(engineRef.current.world, body);

    setNextLevel(randomNextLevel());
    setTimeout(() => { canDropRef.current = true; }, 600);
  }, [nextLevel, gameOver]);

  const handleCanvasClick = useCallback((e) => {
    if (!started) { setStarted(true); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(40, Math.min(CANVAS_W - 40, e.clientX - rect.left));
    dropItem(x);
  }, [started, dropItem]);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    dropXRef.current = Math.max(40, Math.min(CANVAS_W - 40, e.clientX - rect.left));
  }, []);

  const restart = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setStarted(false);
    setNextLevel(randomNextLevel());
    initEngine();
  }, [initEngine]);

  useEffect(() => {
    initEngine();
    return () => {
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    };
  }, []);

  return (
    <main className="page suika-page">
      <div className="suika-wrap">
        <div className="suika-header">
          <Link to="/games" className="back-link">← {t("nav_games")}</Link>
          <h1 className="suika-title">{t("suika_title")}</h1>
          <p className="suika-subtitle">{t("suika_subtitle")}</p>
        </div>

        <div className="suika-layout">
          {/* Sidebar info */}
          <div className="suika-sidebar">
            <div className="score-box">
              <div className="score-label">{t("suika_score")}</div>
              <div className="score-val">{score}</div>
            </div>
            <div className="score-box">
              <div className="score-label">{t("suika_best")}</div>
              <div className="score-val">{best}</div>
            </div>
            <div className="next-box">
              <div className="score-label">{t("suika_next")}</div>
              <div className="next-emoji">{ITEMS[nextLevel].emoji}</div>
              <div className="next-name">{ITEMS[nextLevel].label}</div>
            </div>
            <div className="items-legend">
              {ITEMS.map((item) => (
                <div key={item.level} className="legend-row">
                  <span className="legend-emoji">{item.emoji}</span>
                  <span className="legend-pts">{item.pts}pt</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game canvas */}
          <div className="suika-canvas-wrap">
            <div
              className="suika-canvas-inner"
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
            >
              <div ref={canvasRef} className="suika-canvas-container" />

              {!started && !gameOver && (
                <div className="suika-overlay">
                  <div className="overlay-content">
                    <p className="overlay-emoji">☀️</p>
                    <p className="overlay-text">{t("suika_tip")}</p>
                    <p className="overlay-cta">Click to Start!</p>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="suika-overlay gameover">
                  <div className="overlay-content">
                    <p className="overlay-emoji">💥</p>
                    <h2 className="gameover-title">{t("suika_gameover")}</h2>
                    <p className="gameover-sub">{t("suika_gameover_sub")}</p>
                    <p className="gameover-score">{score} pts</p>
                    <button className="restart-btn" onClick={(e) => { e.stopPropagation(); restart(); }}>
                      {t("suika_play_again")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
