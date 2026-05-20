// ============================================
// QUIZ — 10 bilingual multiple-choice questions
// ============================================

const QUIZ_QUESTIONS = [
  {
    qEn: "What does 태양 (Taeyang) mean?",
    qKo: "'태양'은 무슨 뜻인가요?",
    optionsEn: ["The Moon", "The Sun", "The Star", "The Sky"],
    optionsKo: ["달", "해 (태양)", "별", "하늘"],
    answer: 1,
  },
  {
    qEn: "What is his MBTI?",
    qKo: "MBTI는 무엇인가요?",
    optionsEn: ["ENFP", "ISFJ", "ISTP", "INTJ"],
    optionsKo: ["ENFP", "ISFJ", "ISTP", "INTJ"],
    answer: 2,
  },
  {
    qEn: "When did NEWBEAT debut?",
    qKo: "뉴비트는 언제 데뷔했나요?",
    optionsEn: ["October 12, 2024", "January 14, 2025", "March 24, 2025", "June 1, 2025"],
    optionsKo: ["2024년 10월 12일", "2025년 1월 14일", "2025년 3월 24일", "2025년 6월 1일"],
    answer: 2,
  },
  {
    qEn: "What is his nickname?",
    qKo: "별명은 무엇인가요?",
    optionsEn: ["Tay", "Sunny", "Sunshine", "Bunny"],
    optionsKo: ["테이", "써니 (Sunny)", "선샤인", "버니"],
    answer: 1,
  },
  {
    qEn: "Favorite dessert flavor?",
    qKo: "가장 좋아하는 디저트 맛은?",
    optionsEn: ["Chocolate", "Strawberry", "Pistachio", "Matcha"],
    optionsKo: ["초콜릿", "딸기", "피스타치오", "말차"],
    answer: 2,
  },
  {
    qEn: "Backup dancer for which group?",
    qKo: "어느 그룹의 백댄서였나요?",
    optionsEn: ["A.C.E", "P1Harmony", "Enhypen", "ATEEZ"],
    optionsKo: ["A.C.E", "P1Harmony", "엔하이픈", "에이티즈"],
    answer: 0,
  },
  {
    qEn: "One of his role models?",
    qKo: "롤모델 중 한 명은 누구인가요?",
    optionsEn: ["EXO Baekhyun", "BTS Jungkook", "NCT Mark", "SHINee Taemin"],
    optionsKo: ["EXO 백현", "BTS 정국", "NCT 마크", "샤이니 태민"],
    answer: 0,
  },
  {
    qEn: "What label is NEWBEAT under?",
    qKo: "뉴비트의 소속사는?",
    optionsEn: ["SM Entertainment", "JYP Entertainment", "Beat Interactive", "Hybe"],
    optionsKo: ["SM 엔터테인먼트", "JYP 엔터테인먼트", "Beat Interactive", "하이브"],
    answer: 2,
  },
  {
    qEn: "How tall is Taeyang?",
    qKo: "태양이의 키는?",
    optionsEn: ["172 cm", "176 cm", "180 cm", "184 cm"],
    optionsKo: ["172 cm", "176 cm", "180 cm", "184 cm"],
    answer: 2,
  },
  {
    qEn: "Favorite song?",
    qKo: "최애곡은?",
    optionsEn: ["Cherry Bomb — NCT 127", "때깔 (Killin' It) — P1Harmony", "Love Dive — IVE", "Fancy — Twice"],
    optionsKo: ["Cherry Bomb — NCT 127", "때깔 — P1Harmony", "러브 다이브 — 아이브", "팬시 — 트와이스"],
    answer: 1,
  },
];

function QuizGame({ setRoute }) {
  const { t, lang, other } = useLang();
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const q = QUIZ_QUESTIONS[idx];
  const total = QUIZ_QUESTIONS.length;
  const letters = ["A", "B", "C", "D"];

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (idx === total - 1) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const reactionKey = score === 10 ? "perfect" : score >= 7 ? "high" : score >= 4 ? "mid" : "low";
  const reaction = { primary: t.quiz.reactions[reactionKey], secondary: other.quiz.reactions[reactionKey] };

  return (
    <div className="page">
      <button className="back-link" onClick={() => setRoute("games")}>
        <Icon.ChevronLeft />
        <span>{t.quiz.back}</span>
      </button>

      <div className="game-header">
        <h1>{t.quiz.title}</h1>
        <div className="sub ko">{t.quiz.subtitle}</div>
      </div>

      {!done && (
        <div className="quiz-screen">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((idx + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
          </div>
          <div className="quiz-meta">
            <span>{t.quiz.question} {idx + 1} {t.quiz.of} {total}</span>
            <span>{score} pts</span>
          </div>

          <div className="quiz-card">
            <div className="quiz-question">{lang === "en" ? q.qEn : q.qKo}</div>
            <div className="quiz-question-ko ko">{lang === "en" ? q.qKo : q.qEn}</div>

            <div className="quiz-options">
              {(lang === "en" ? q.optionsEn : q.optionsKo).map((opt, i) => {
                let cls = "quiz-option";
                if (picked !== null) {
                  if (i === q.answer) cls += " correct";
                  else if (i === picked) cls += " wrong";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    disabled={picked !== null}
                    onClick={() => pick(i)}
                  >
                    <span className="quiz-option-letter">{letters[i]}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="quiz-next-wrap">
                <button className="btn-primary" onClick={next}>
                  {idx === total - 1 ? t.quiz.finish : t.quiz.next}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="quiz-screen">
          <div className="quiz-result">
            <div className="quiz-score-circle">
              <div className="big">{score}</div>
              <div className="small">/ {total}</div>
            </div>
            <h2 className="quiz-reaction">{reaction.primary}</h2>
            <div className="quiz-reaction-ko ko">{reaction.secondary}</div>
            <button className="btn-primary" onClick={restart}>
              {t.quiz.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

window.QuizGame = QuizGame;
