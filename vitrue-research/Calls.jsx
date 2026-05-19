/* Calls table — filterable, click row to open drawer */

const STATUS_FILTERS = [
  { id: 'all',      label: 'כל השיחות' },
  { id: 'closed',   label: 'נסגרו' },
  { id: 'hold',     label: 'שמירת מקום' },
  { id: 'followup', label: 'במעקב' },
  { id: 'lost',     label: 'לא נסגר' },
];

function CallsTable({ data, onPick }) {
  const [filter, setFilter] = React.useState('all');
  const [repFilter, setRepFilter] = React.useState('all');

  const rows = data.calls.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'closed') return c.status === 'closed' || c.status === 'closed-corp';
    return c.status === filter;
  }).filter(c => repFilter === 'all' || c.rep === repFilter);

  const repNames = Array.from(new Set(data.calls.map(c => c.rep)));

  const filterCounts = STATUS_FILTERS.map(f => {
    if (f.id === 'all') return data.calls.length;
    if (f.id === 'closed') return data.calls.filter(c => c.status === 'closed' || c.status === 'closed-corp').length;
    return data.calls.filter(c => c.status === f.id).length;
  });

  return (
    <section className="block" id="calls">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 1</div>
          <h2>סקירת עשר השיחות</h2>
        </div>
        <div className="right">לחיצה על שורה פותחת את ניתוח השיחה המלא</div>
      </div>

      <div className="calls-toolbar">
        <span className="filter-label">סטטוס</span>
        {STATUS_FILTERS.map((f, i) => (
          <button
            key={f.id}
            className={`chip${filter === f.id ? ' active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="n num">{filterCounts[i]}</span>
          </button>
        ))}
        <span style={{ width: 18 }}></span>
        <span className="filter-label">נציג</span>
        <button
          className={`chip${repFilter === 'all' ? ' active' : ''}`}
          onClick={() => setRepFilter('all')}
        >הכל</button>
        {repNames.map(r => (
          <button
            key={r}
            className={`chip${repFilter === r ? ' active' : ''}`}
            onClick={() => setRepFilter(r)}
          >{r}</button>
        ))}
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>#</th>
              <th>ליד · פרופיל</th>
              <th>נציג</th>
              <th>ציון</th>
              <th>סטטוס</th>
              <th>הערה</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.id} className={c.featured ? 'featured' : ''} onClick={() => onPick(c.id)}>
                <td className="id-col">
                  {c.featured && <span className="star">★</span>}
                  {String(c.id).padStart(2,'0')}
                </td>
                <td>
                  <div className="lead-cell">
                    <div className="nm">{c.lead}</div>
                    <div className="pf">{c.profile} · {c.role}</div>
                  </div>
                </td>
                <td>
                  <span className={`rep-pill${c.rep === 'רז' ? ' gold' : ''}`}>
                    <span className="av">{c.rep[0]}</span>
                    <span>{c.rep}</span>
                  </span>
                </td>
                <td><Score value={c.score} /></td>
                <td><StatusBadge status={c.status} /></td>
                <td style={{ color: 'var(--rv-slate)', fontSize: 13, maxWidth: 360 }}>{c.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ────── Drawer ────── */

function CallDrawer({ call, onClose }) {
  if (!call) return null;
  return (
    <>
      <div className={`scrim${call ? ' open' : ''}`} onClick={onClose}></div>
      <aside className={`drawer${call ? ' open' : ''}`}>
        <div className="dh">
          <div className="row">
            <div>
              <div className="eb">שיחה #{String(call.id).padStart(2,'0')}{call.featured && ' · תבנית הזהב'}</div>
              <h3>{call.lead}</h3>
              <div className="pf">{call.profile} · {call.role}</div>
            </div>
            <button className="x" onClick={onClose} aria-label="סגור"><RvIcon name="close" size={16} /></button>
          </div>
          <div className="dh-stats">
            <div className="dh-stat">
              <div className="l">ציון איכות</div>
              <div className="v num">{call.score.toFixed(1)}<span style={{ fontSize: 13, color: 'var(--rv-fog)', fontWeight: 400 }}>/10</span></div>
            </div>
            <div className="dh-stat">
              <div className="l">נציג</div>
              <div className="v">{call.rep}</div>
            </div>
            <div className="dh-stat">
              <div className="l">סטטוס</div>
              <div className="v" style={{ fontSize: 14 }}><StatusBadge status={call.status} /></div>
            </div>
          </div>
        </div>

        <div className="db">
          <div>
            <div className="sec-ttl">תקציר השיחה</div>
            <p className="sum">{call.summary}</p>
          </div>

          {call.strengths.length > 0 && (
            <div>
              <div className="sec-ttl">חוזקות בשיחה</div>
              <div className="chips">
                {call.strengths.map((s,i) => <span key={i} className="c strong">{s}</span>)}
              </div>
            </div>
          )}

          {call.weaknesses.length > 0 && (
            <div>
              <div className="sec-ttl">נקודות לשיפור</div>
              <div className="chips">
                {call.weaknesses.map((s,i) => <span key={i} className="c weak">{s}</span>)}
              </div>
            </div>
          )}

          {call.objections.length > 0 && (
            <div>
              <div className="sec-ttl">התנגדויות שעלו</div>
              <div className="chips">
                {call.objections.map((s,i) => <span key={i} className="c">{s}</span>)}
              </div>
            </div>
          )}

          <div>
            <div className="sec-ttl">פסיקה</div>
            <div className="verdict">{call.verdict}</div>
          </div>

          <div>
            <div className="sec-ttl">שלב נוכחי</div>
            <p className="sum" style={{ fontSize: 13 }}>{call.stage}</p>
          </div>
        </div>
      </aside>
    </>
  );
}

window.CallsTable = CallsTable;
window.CallDrawer = CallDrawer;
