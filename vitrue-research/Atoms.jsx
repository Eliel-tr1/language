/* Shared atoms — icons + small components */

const RvIcon = ({ name, size = 16 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'overview':  return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'calls':     return <svg {...p}><path d="M5 4h6l2 4-3 2c1 2 3 4 5 5l2-3 4 2v6c0 1-1 2-2 2C9 22 2 15 2 6c0-1 1-2 2-2"/></svg>;
    case 'patterns':  return <svg {...p}><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>;
    case 'reps':      return <svg {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="6" r="2.5"/><path d="M21 15c0-2.5-1.8-4.5-4-4.5"/></svg>;
    case 'rec':       return <svg {...p}><path d="M12 2l2.4 5.5 6 .6-4.5 4 1.4 5.9L12 15l-5.3 3 1.4-5.9-4.5-4 6-.6z"/></svg>;
    case 'quote':     return <svg {...p}><path d="M7 8c-2 0-4 2-4 4v4h6v-6H6c0-1 1-2 2-2zM17 8c-2 0-4 2-4 4v4h6v-6h-3c0-1 1-2 2-2z"/></svg>;
    case 'filter':    return <svg {...p}><path d="M4 5h16M7 12h10M10 19h4"/></svg>;
    case 'download':  return <svg {...p}><path d="M12 4v12M6 12l6 6 6-6M5 20h14"/></svg>;
    case 'share':     return <svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.5 10.5l7-3.5M8.5 13.5l7 3.5"/></svg>;
    case 'arrow-left': return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-right':return <svg {...p}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'close':     return <svg {...p}><path d="M6 6l12 12M6 18L18 6"/></svg>;
    case 'check':     return <svg {...p}><path d="M5 12l5 5L20 7"/></svg>;
    case 'alert':     return <svg {...p}><path d="M12 8v5M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>;
    case 'star':      return <svg {...p}><path d="M12 2l2.4 5.5 6 .6-4.5 4 1.4 5.9L12 15l-5.3 3 1.4-5.9-4.5-4 6-.6z"/></svg>;
    case 'chev-left': return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'spark':     return <svg {...p}><path d="M12 2l1.4 4.2L18 8l-3 3 1 5-4-2-4 2 1-5-3-3 4.6-1.8z"/></svg>;
    case 'circle':    return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
    default: return null;
  }
};

/* Score helper */
const scoreClass = (s) => s >= 9 ? 'top' : s >= 7.5 ? 'hi' : s >= 6 ? 'mid' : 'lo';

const Score = ({ value }) => (
  <span className={`score ${scoreClass(value)}`}>
    <span className="num-v num">{value.toFixed(1)}</span>
    <span className="bar"><i style={{ width: `${(value/10)*100}%` }}></i></span>
  </span>
);

/* Status badge → Hebrew label */
const STATUS_LABELS = {
  closed:      'נסגר',
  'closed-corp': 'נסגר (ארגוני)',
  hold:        'שמירת מקום',
  followup:    'מעקב',
  lost:        'לא נסגר',
};

const StatusBadge = ({ status }) => (
  <span className={`badge ${status}`}>
    <span className="dot"></span>
    {STATUS_LABELS[status] || status}
  </span>
);

const repInitial = (name) => name[0];

window.RvIcon = RvIcon;
window.Score = Score;
window.StatusBadge = StatusBadge;
window.STATUS_LABELS = STATUS_LABELS;
window.scoreClass = scoreClass;
window.repInitial = repInitial;
