/* tokens.jsx — design tokens, helpers, tiny icons shared across all screens */

const T = {
  bg: '#FFFFFF',         // pure white
  bg2: '#FAF5FF',        // softest lavender wash (panels)
  bg3: '#F0E5FA',        // chip/track tint
  ink: '#2A1A3A',        // deep purple-black
  ink2: '#5A4A6A',       // body
  ink3: '#9A8AAA',       // muted
  ink4: '#C5BACF',       // disabled / placeholder
  line: '#EFE5F7',       // hairline
  card: '#FFFFFF',
  lime: '#C490ED',       // Beep purple — soft cute pastel (default accent)
  limeDeep: '#A865E0',
  coral: '#E84B91',
  amber: '#FFC93C',      // Beep yellow sparkle
  sans: "'Fredoka', 'ZCOOL KuaiLe', 'Gowun Dodum', 'Zen Maru Gothic', -apple-system, system-ui, sans-serif",
  pro:  "'Nunito', 'Noto Sans KR', 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, system-ui, sans-serif",
  serif: "'Fredoka', 'ZCOOL KuaiLe', 'Gowun Dodum', 'Zen Maru Gothic', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// dark-mode swap helper
function tokens({ dark, accent, radius }) {
  if (dark) {
    return {
      ...T,
      bg: '#1A0E26',
      bg2: '#2A1B36',
      bg3: '#3A2A4A',
      ink: '#FAF5FF',
      ink2: '#E5D8F0',
      ink3: '#A89BB8',
      ink4: '#6F5F80',
      line: '#3A2A4A',
      card: '#2A1B36',
      lime: accent || T.lime,
      r: radius,
    };
  }
  return { ...T, lime: accent || T.lime, r: radius };
}

// ── tiny icon set (lucide-style, sized via currentColor) ──────────────────
const Icon = {
  Menu: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="14" y2="17"/></svg>,
  Settings: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Send: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="12" x2="20" y2="5"/><line x1="3" y1="12" x2="11" y2="14"/><line x1="3" y1="12" x2="8" y2="20"/><line x1="20" y1="5" x2="11" y2="14"/><line x1="20" y1="5" x2="14" y2="22"/></svg>,
  Copy: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Expand: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  Speaker: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>,
  Star: ({ fill, ...p }) => <svg width="14" height="14" viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Plus: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  Chevron: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
  ChevronDown: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  Arrow: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowLeft: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Swap: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="7 17 3 13 7 9"/><line x1="3" y1="13" x2="21" y2="13"/><polyline points="17 7 21 11 17 15"/><line x1="21" y1="11" x2="3" y2="11"/></svg>,
  Trash: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1.4 14.1a2 2 0 01-2 1.9H8.4a2 2 0 01-2-1.9L5 6"/><path d="M10 11v6M14 11v6"/></svg>,
  Image: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Mic: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 01-14 0"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
  Bookmark: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
  User: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>,
  Globe: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>,
  Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2z"/></svg>,
  Download: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Camera: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Edit: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4z"/></svg>,
  Logout: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// language meta
const LANGS = {
  cn: { code: 'CN', name: '中文', latin: 'Chinese', hello: '你好' },
  kr: { code: 'KO', name: '한국어', latin: 'Korean', hello: '안녕' },
  en: { code: 'EN', name: 'English', latin: 'English', hello: 'Hello' },
  jp: { code: 'JP', name: '日本語', latin: 'Japanese', hello: 'こんにちは' },
};

// animated TTS waveform — used wherever a voice is playing
function Waveform({ active = false, color = 'currentColor', bars = 5 }) {
  const arr = Array.from({ length: bars });
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center', height: 12 }}>
      {arr.map((_, i) => (
        <span key={i} style={{
          width: 2, background: color, borderRadius: 1,
          animation: active ? `wave 0.9s ${i * 0.12}s ease-in-out infinite` : 'none',
          height: active ? undefined : 4,
        }} />
      ))}
      <style>{`@keyframes wave { 0%,100%{height:3px} 50%{height:11px} }`}</style>
    </span>
  );
}

// cute decorative sparkle cluster — purely visual confetti
function Sparkles({ color = '#FF8DAB', style }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" style={style}>
      <path d="M16 4 L17.4 12 L25 13 L17.4 14 L16 22 L14.6 14 L7 13 L14.6 12 Z" fill={color}/>
      <circle cx="26" cy="6" r="1.6" fill={color}/>
      <circle cx="5" cy="22" r="1.2" fill={color}/>
      <path d="M6 8 L6.5 10 L8 10.5 L6.5 11 L6 13 L5.5 11 L4 10.5 L5.5 10 Z" fill={color}/>
    </svg>
  );
}

// little dotted heart
function Heart({ color = '#FF8DAB', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21s-7-4.5-9-9C1.5 8.5 4 5 7 5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3 0 5.5 3.5 4 7-2 4.5-9 9-9 9z"/>
    </svg>
  );
}

// Beep sparkle dots — the three yellow capsules from the logo, after the "p"
function BeepSparkles({ size = 16, color = '#FFC93C' }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 20 24" style={{ display: 'inline-block', verticalAlign: 'baseline' }}>
      <rect x="2"  y="3"  width="3" height="9"  rx="1.5" fill={color} transform="rotate(-22 3.5 7.5)"/>
      <rect x="9"  y="2"  width="3" height="11" rx="1.5" fill={color}/>
      <rect x="15" y="3"  width="3" height="9"  rx="1.5" fill={color} transform="rotate(22 16.5 7.5)"/>
    </svg>
  );
}

// label-mono caption — recurring metadata pattern
function Meta({ children, color, style }) {
  return <span style={{
    fontFamily: T.mono, fontSize: 10, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: color || T.ink3,
    ...style,
  }}>{children}</span>;
}

// shared screen shell: cream bg + safe content area
function Screen({ children, bg, T: theme }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg || (theme?.bg || T.bg),
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: T.sans, color: theme?.ink || T.ink,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, { T, tokens, Icon, LANGS, Waveform, Meta, Screen, Sparkles, Heart, BeepSparkles });
