// ============================================
// i18n — translations + LanguageContext
// ============================================

const TRANSLATIONS = {
  en: {
    nav: { home: "Profile", games: "Games", pet: "Pet Sunny", birthday: "Birthday" },
    popup: {
      question: "Are you Kim Taeyang?",
      yes: "YES",
      no: "NO",
      yesResponse: "Kim Taeyang, the one and only!",
      noResponse: "Welcome to Taeyang's world.",
    },
    home: {
      subtitle: "NEWBEAT • Debuted 2025",
      factsTitle: "Profile",
      factsSubtitle: "The essentials",
      didYouKnow: "Fun Facts",
      didYouKnowSub: "About Taeyang",
      footer: "Made with love",
      photoLabel: "Photo coming soon",
      bio: "Full Biography",
      bioSub: "Everything in one place",
      timeline: "Career Timeline",
      personality: "Sunny Personality",
      personalitySub: "What makes him him",
    },
    about: {
      title: "About Taeyang",
      subtitle: "Full profile",
      bio: "Biography",
      timeline: "Career Timeline",
      personality: "Sunny Personality",
      personalitySub: "What makes him him",
      fullName: "Full Name",
      born: "Born",
      birthplace: "Birthplace",
      label: "Label",
      height: "Height",
      mbti: "MBTI",
      nickname: "Nickname",
      debut: "Debut",
      photoLabel: "Photo coming soon",
    },
    pet: {
      title: "Pet Sunny",
      subtitle: "Sunny's part cat, part little piggy",
      petAction: "Pet",
      feedFish: "Cat treat",
      feedCookie: "Cookie",
      sleep: "Nap",
      happiness: "Happiness",
      hunger: "Hunger",
      energy: "Energy",
      reactions: {
        pet: "Purrr... ♡",
        feedFish: "Nom nom! Cat mode on.",
        feedCookie: "Oink! So tasty!",
        sleep: "Zzz... sweet dreams.",
        bored: "Pet me, I'm bored!",
        hungry: "Tummy rumbling!",
        sleepy: "So sleepy...",
      },
      reset: "Reset",
    },
    birthday: {
      title: "Birthday Countdown",
      subtitle: "Until Taeyang's next birthday",
      until: "Until December 6",
      turning: "Sunny is turning",
      ageEn: "this year!",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      todayTitle: "Happy Birthday Sunny!",
      todaySub: "Today is the day!",
      message: "Taeyang was born on December 6, 2006.",
    },
    games: {
      title: "MINI GAMES",
      subtitle: "Taeyang mini games",
      play: "Play Now",
      g1: { name: "Merge Taeyang", desc: "Suika-style merge game. Drop and combine matching circles to reach the final TAEYANG!" },
      g2: { name: "Taeyang Quiz", desc: "10 questions about Kim Taeyang." },
      g3: { name: "Card Flip", desc: "Memory matching game. Find all 8 pairs of Taeyang cards as fast as you can." },
    },
    suika: {
      title: "Merge Taeyang",
      subtitle: "Drop, combine, evolve",
      score: "Score",
      best: "Best",
      next: "Next",
      restart: "Restart",
      gameOver: "Game Over!",
      gameOverSub: "Try again!",
      legend: "Levels",
      back: "Back to games",
    },
    quiz: {
      title: "Taeyang Quiz",
      subtitle: "Taeyang trivia",
      question: "Question",
      of: "of",
      next: "Next",
      finish: "Finish",
      restart: "Play Again",
      result: "Your Score",
      back: "Back to games",
      reactions: {
        low: "There's more to discover about him.",
        mid: "Getting there — he has so much depth.",
        high: "Impressive — a thorough knowledge of Taeyang.",
        perfect: "PERFECT! A complete picture of Kim Taeyang.",
      },
    },
    memory: {
      title: "Card Flip",
      subtitle: "Find all 8 pairs",
      time: "Time",
      attempts: "Attempts",
      matched: "Matched",
      restart: "Restart",
      won: "You Won!",
      wonSub: "All cards matched!",
      back: "Back to games",
    },
  },
  ko: {
    nav: { home: "프로필", games: "게임", pet: "써니 펫", birthday: "생일" },
    popup: {
      question: "당신이 김태양인가요?",
      yes: "네",
      no: "아니요",
      yesResponse: "김태양, 단 하나뿐인 그!",
      noResponse: "태양이의 세계에 오신 것을 환영해요.",
    },
    home: {
      subtitle: "뉴비트 • 2025년 데뷔",
      factsTitle: "프로필",
      factsSubtitle: "기본 정보",
      didYouKnow: "재미있는 사실",
      didYouKnowSub: "태양에 대하여",
      footer: "사랑을 담아 만들었어요",
      photoLabel: "사진 준비 중",
      bio: "약력",
      bioSub: "모든 정보를 한 곳에",
      timeline: "활동 연혁",
      personality: "써니 성격",
      personalitySub: "태양다움이란",
    },
    about: {
      title: "태양 소개",
      subtitle: "그의 모든 것",
      bio: "약력",
      timeline: "활동 연혁",
      personality: "써니 성격",
      personalitySub: "태양다움이란",
      fullName: "본명",
      born: "생일",
      birthplace: "출생지",
      label: "소속사",
      height: "키",
      mbti: "MBTI",
      nickname: "별명",
      debut: "데뷔",
      photoLabel: "사진 준비 중",
    },
    pet: {
      title: "써니 펫",
      subtitle: "써니는 고양이 + 작은 돼지",
      petAction: "쓰다듬기",
      feedFish: "고양이 간식",
      feedCookie: "쿠키",
      sleep: "낮잠",
      happiness: "행복",
      hunger: "포만감",
      energy: "에너지",
      reactions: {
        pet: "골골... ♡",
        feedFish: "냠냠! 고양이 모드 ON.",
        feedCookie: "꿀꿀! 맛있어!",
        sleep: "쿨쿨... 좋은 꿈 꿔요.",
        bored: "심심해요, 쓰다듬어 주세요!",
        hungry: "배고파요!",
        sleepy: "졸려요...",
      },
      reset: "초기화",
    },
    birthday: {
      title: "생일 카운트다운",
      subtitle: "써니의 다음 생일까지",
      until: "12월 6일까지",
      turning: "써니는 올해",
      ageEn: "살이 돼요!",
      days: "일",
      hours: "시간",
      minutes: "분",
      seconds: "초",
      todayTitle: "써니야 생일 축하해!",
      todaySub: "오늘이 그 날이에요!",
      message: "태양이는 2006년 12월 6일생.",
    },
    games: {
      title: "미니 게임",
      subtitle: "태양이 미니 게임",
      play: "지금 플레이",
      g1: { name: "합성김태양", desc: "수박 게임 스타일! 같은 동그라미를 합쳐서 최종 태양을 만들어요." },
      g2: { name: "태양 퀴즈", desc: "태양이에 관한 10가지 질문." },
      g3: { name: "카드 뒤집기", desc: "기억력 게임! 8쌍의 태양 카드를 최대한 빠르게 찾아보세요." },
    },
    suika: {
      title: "합성김태양",
      subtitle: "떨어뜨리고, 합치고, 진화시켜요",
      score: "점수",
      best: "최고 점수",
      next: "다음",
      restart: "다시 시작",
      gameOver: "게임 오버!",
      gameOverSub: "다시 도전해요!",
      legend: "레벨",
      back: "게임 목록으로",
    },
    quiz: {
      title: "태양 퀴즈",
      subtitle: "태양이에 관한 퀴즈",
      question: "문제",
      of: "/",
      next: "다음",
      finish: "끝내기",
      restart: "다시 하기",
      result: "당신의 점수",
      back: "게임 목록으로",
      reactions: {
        low: "태양이의 매력은 무궁무진해요.",
        mid: "깊이가 있는 사람이에요.",
        high: "태양이에 대해 잘 알고 있네요.",
        perfect: "만점! 김태양 완전 정복.",
      },
    },
    memory: {
      title: "카드 뒤집기",
      subtitle: "8쌍을 모두 찾아요",
      time: "시간",
      attempts: "시도",
      matched: "맞춤",
      restart: "다시 시작",
      won: "이겼어요!",
      wonSub: "모든 카드를 맞췄어요!",
      back: "게임 목록으로",
    },
  },
};

const LanguageContext = React.createContext({ lang: "en", setLang: () => {}, t: TRANSLATIONS.en });

function LanguageProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try { return localStorage.getItem("taeyang.lang") || "en"; } catch { return "en"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("taeyang.lang", l); } catch {}
  };
  const value = React.useMemo(() => ({
    lang,
    setLang,
    t: TRANSLATIONS[lang],
    other: TRANSLATIONS[lang === "en" ? "ko" : "en"],
  }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

const useLang = () => React.useContext(LanguageContext);

// Bilingual facts data
const TAEYANG_FACTS = {
  fullName: { en: "Kim Taeyang", ko: "김태양" },
  stageName: { en: "Taeyang (The Sun)", ko: "태양" },
  group: { en: "NEWBEAT", ko: "뉴비트" },
  label: { en: "Beat Interactive", ko: "Beat Interactive" },
  born: { en: "December 6, 2006", ko: "2006년 12월 6일" },
  birthplace: { en: "Bundang-gu, Seongnam, Gyeonggi", ko: "경기도 성남시 분당구" },
  height: { en: "180 cm", ko: "180 cm" },
  mbti: { en: "ISTP", ko: "ISTP" },
  nickname: { en: "Sunny", ko: "써니" },
  debut: { en: "March 24, 2025", ko: "2025년 3월 24일" },
};

const DID_YOU_KNOW = [
  {
    en: "His stage name 태양 literally means 'The Sun'.",
    ko: "예명 '태양'은 말 그대로 '해'를 뜻해요.",
  },
  {
    en: "He loves pistachio desserts, cookies, and bread.",
    ko: "피스타치오 디저트, 쿠키, 빵을 정말 좋아해요.",
  },
  {
    en: "He's shy at first but super playful with close friends.",
    ko: "처음엔 수줍지만 친한 친구들과는 정말 장난꾸러기예요.",
  },
  {
    en: "His role models are EXO Baekhyun and Enhypen Ni-ki.",
    ko: "롤모델은 EXO 백현과 엔하이픈 니키예요.",
  },
  {
    en: "Favorite song: 때깔 (Killin' It) by P1Harmony.",
    ko: "최애곡: P1Harmony의 '때깔'.",
  },
  {
    en: "Was a backup dancer for A.C.E's 'My Girl' before debuting.",
    ko: "데뷔 전 A.C.E의 'My Girl' 백댄서로 활동했어요.",
  },
];

const TIMELINE = [
  {
    year: "2023",
    en: "Backup dancer for A.C.E's 'My Girl' — first taste of the stage.",
    ko: "A.C.E 'My Girl' 백댄서로 활동 — 첫 무대 경험.",
  },
  {
    year: "2024",
    en: "Trainee under Beat Interactive, preparing for NEWBEAT debut.",
    ko: "Beat Interactive 연습생으로 뉴비트 데뷔 준비.",
  },
  {
    year: "2025",
    en: "Debuted as a member of NEWBEAT with album 'Raw and Rad' on March 24.",
    ko: "3월 24일 앨범 'Raw and Rad'로 뉴비트 멤버로 데뷔.",
  },
];

const PERSONALITY_TRAITS = [
  { en: "Shy at first", ko: "처음엔 수줍어요" },
  { en: "Playful with friends", ko: "친구들과는 장난꾸러기" },
  { en: "Bright energy", ko: "밝은 에너지" },
  { en: "ISTP cool", ko: "ISTP의 멋짐" },
  { en: "Dessert lover", ko: "디저트 매니아" },
  { en: "Loyal to music", ko: "음악에 진심" },
  { en: "Dancer-trained", ko: "댄서 출신" },
];

window.LanguageContext = LanguageContext;
window.LanguageProvider = LanguageProvider;
window.useLang = useLang;
window.TAEYANG_FACTS = TAEYANG_FACTS;
window.DID_YOU_KNOW = DID_YOU_KNOW;
window.TIMELINE = TIMELINE;
window.PERSONALITY_TRAITS = PERSONALITY_TRAITS;
