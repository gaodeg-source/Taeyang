import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../LangContext";
import "./QuizGame.css";

export default function QuizGame() {
  const { t } = useLang();
  const questions = t("quiz_questions");
  const reactions = t("quiz_reactions");

  const [step, setStep] = useState(0); // 0..9 = quiz, 10 = result
  const [selected, setSelected] = useState(null); // chosen option index
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const current = questions[step];

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= questions.length) {
      setStep(questions.length);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
  };

  const reaction = reactions.find((r) => score >= r.min && score <= r.max) || reactions[0];
  const finalScore = step >= questions.length ? score : null;

  return (
    <main className="page quiz-page">
      <div className="quiz-wrap">
        <div className="quiz-header">
          <Link to="/games" className="back-link">← {t("nav_games")}</Link>
          <h1 className="quiz-title">{t("quiz_title")}</h1>
          <p className="quiz-subtitle">{t("quiz_subtitle")}</p>
        </div>

        {step < questions.length ? (
          <div className="quiz-card" key={step}>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((step) / questions.length) * 100}%` }}
              />
            </div>

            <p className="quiz-q-label">
              {t("quiz_question")} {step + 1} {t("quiz_of")} {questions.length}
            </p>

            <p className="quiz-question">{current.q}</p>

            <div className="quiz-options">
              {current.options.map((opt, i) => {
                let cls = "quiz-option";
                if (answered) {
                  if (i === current.answer) cls += " correct";
                  else if (i === selected) cls += " wrong";
                  else cls += " faded";
                }
                return (
                  <button key={i} className={cls} onClick={() => choose(i)}>
                    <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                    {opt}
                    {answered && i === current.answer && <span className="opt-check">✓</span>}
                    {answered && i === selected && i !== current.answer && <span className="opt-x">✗</span>}
                  </button>
                );
              })}
            </div>

            {answered && (
              <button className="quiz-next-btn" onClick={next}>
                {t("quiz_next")}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-result">
            <div className="result-sun">🌞</div>
            <h2 className="result-title">{t("quiz_result_title")}</h2>
            <div className="result-score-wrap">
              <div className="result-score">
                {score} <span className="result-total">/ {questions.length}</span>
              </div>
              <p className="result-label">{t("quiz_score_label")}</p>
            </div>
            <p className="result-reaction">{reaction.text}</p>

            <div className="result-stars">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={`result-star ${i < score ? "lit" : "dim"}`}>
                  ★
                </span>
              ))}
            </div>

            <button className="quiz-next-btn wide" onClick={restart}>
              {t("quiz_play_again")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
