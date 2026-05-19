/* Sidebar — deep navy, RTL right-aligned */

const NAV = [
  { id: 'hero',     label: 'תקציר מנהלים',   icon: 'overview', count: null },
  { id: 'kpis',     label: 'מספרים מרכזיים',  icon: 'spark',    count: 6 },
  { id: 'calls',    label: 'עשר השיחות',       icon: 'calls',    count: 10 },
  { id: 'tech',     label: 'טכניקות מנצחות',   icon: 'star',     count: 5 },
  { id: 'fails',    label: 'נקודות חולשה',     icon: 'alert',    count: 7 },
  { id: 'obj',      label: 'התנגדויות חוזרות', icon: 'patterns', count: 7 },
  { id: 'reps',     label: 'נציגי מכירות',     icon: 'reps',     count: 3 },
  { id: 'rec',      label: 'תוכנית פעולה',     icon: 'rec',      count: 12 },
  { id: 'golden',   label: 'תבנית הזהב',       icon: 'quote',    count: null },
];

function Sidebar({ active, onNav }) {
  return (
    <aside className="side">
      <div className="brand">
        <div className="brand-mark">
          <div className="arc"></div>
          <div className="sq"></div>
          <div className="v">V</div>
        </div>
        <div className="brand-text">
          <div className="name">vitrue</div>
          <div className="meta">research · 2026</div>
        </div>
      </div>

      <div className="side-section">דוח</div>
      <nav>
        {NAV.map(n => (
          <div
            key={n.id}
            className={`nav-item${active === n.id ? ' active' : ''}`}
            onClick={() => onNav(n.id)}
          >
            <RvIcon name={n.icon} size={15} />
            <span>{n.label}</span>
            {n.count != null && <span className="count num">{n.count}</span>}
          </div>
        ))}
      </nav>

      <div className="side-foot">
        <div className="partner-label">בשיתוף</div>
        <div className="hu-logo">
          <div className="hu-img">
            <img src="assets/huji-logo.png" alt="האוניברסיטה העברית · הכשרת מנהלים" />
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.NAV = NAV;
