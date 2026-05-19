/* Techniques + Failures + Objections + Reps + Recommendations + Golden */

function Techniques({ data }) {
  return (
    <section className="block" id="tech">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 2 · מה עובד</div>
          <h2>חמש טכניקות מנצחות</h2>
        </div>
        <div className="right">דורגו לפי השפעה על Conversion Rate</div>
      </div>
      <div className="tech-grid">
        {data.techniques.map(t => (
          <article key={t.id} className="tech">
            <div className="medal num">{t.medal}</div>
            <h3 className="ttl">{t.title}</h3>
            <p className="body">{t.summary}</p>
            <div className="action">
              <b>פעולה מומלצת ·</b> {t.action}
            </div>
            <div className="seen">
              {t.seenIn.map(i => (
                <span key={i} className="ic-circ">{String(i).padStart(2,'0')}</span>
              ))}
              <span style={{ marginRight: 4 }}>זוהתה בשיחות</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Failures({ data }) {
  return (
    <section className="block" id="fails">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 3 · מה לא עובד</div>
          <h2>שבע נקודות חולשה חוזרות</h2>
        </div>
        <div className="right">אדום = פגיעה מערכתית, דורש התערבות מיידית</div>
      </div>
      <div className="fail-list">
        {data.failures.map((f,i) => (
          <article key={f.id} className={`fail${f.severity === 'critical' ? ' critical' : ''}`}>
            <div className="num">{String(i+1).padStart(2,'0')}</div>
            <div className="body">
              <div className="ttl">{f.title}</div>
              <div className="detail">{f.detail}</div>
              <div className="fix">{f.fix}</div>
            </div>
            <div className="seen-count">
              <span className="num">{f.seenIn.length}</span>×
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Objections({ data }) {
  const maxC = Math.max(...data.objections.map(o => o.count));
  return (
    <section className="block" id="obj">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 4 · דפוסים</div>
          <h2>התנגדויות חוזרות — שכיחות וטיפול</h2>
        </div>
        <div className="right">תדירות בעשר השיחות שנותחו</div>
      </div>
      <div className="card gold-edge">
        {data.objections.map(o => (
          <div key={o.id} className="obj-row">
            <div className="nm">{o.name}</div>
            <div className="count">
              {o.count}<span className="sm">/10</span>
            </div>
            <div className="bar">
              <i style={{ width: `${(o.count / maxC) * 100}%` }}></i>
            </div>
            <div className="handle">{o.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reps({ data }) {
  return (
    <section className="block" id="reps">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 5 · ביצועי נציגים</div>
          <h2>השוואת שלושה נציגים</h2>
        </div>
        <div className="right">קוטב הזהב = נציג עם הביצוע הגבוה ביותר</div>
      </div>
      <div className="reps">
        {data.reps.map(r => (
          <article key={r.id} className={`rep${r.tone === 'gold' ? ' gold' : ''}`}>
            <div className="top">
              <div className="av">{r.name[0]}</div>
              <div>
                <div className="nm">{r.name}</div>
                <div className="role">
                  {r.tone === 'gold' ? '🏆 ביצוע מוביל · ' : ''}
                  {r.calls} שיחות · {r.closes} סגירה{r.closes === 1 ? '' : 'ות'}
                </div>
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="v num">{r.avgScore.toFixed(1)}</div>
                <div className="l">ממוצע</div>
              </div>
              <div className="stat">
                <div className="v num">{r.peak.toFixed(1)}</div>
                <div className="l">שיא</div>
              </div>
              <div className="stat">
                <div className="v num">{r.low.toFixed(1)}</div>
                <div className="l">שפל</div>
              </div>
            </div>
            <div className="lists">
              <div>
                <div className="lst-title">חזק במיוחד</div>
                <ul className="lst">
                  {r.strengths.map((s,i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <div className="lst-title weak">דורש שיפור</div>
                <ul className="lst weak">
                  {r.weaknesses.map((s,i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
            <div className="note">{r.note}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

const REC_GROUPS = [
  { key: 'immediate', marker: 'I',  title: 'מיידי',     sub: 'השבועיים הקרובים' },
  { key: 'short',     marker: 'II', title: 'טווח קצר',   sub: 'החודש הקרוב' },
  { key: 'mid',       marker: 'III',title: 'טווח בינוני', sub: 'שלושה חודשים' },
];

function Recommendations({ data }) {
  return (
    <section className="block" id="rec">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">חלק 6 · תוכנית פעולה</div>
          <h2>שתים-עשרה פעולות אסטרטגיות</h2>
        </div>
        <div className="right">מסודרות לפי טווח זמן ובעלות יישום</div>
      </div>
      <div className="rec-cols">
        {REC_GROUPS.map(g => (
          <div key={g.key} className="rec-col">
            <div className="rec-col-head">
              <div className="marker num">{g.marker}</div>
              <div className="ttl">{g.title}</div>
              <div className="sub">{g.sub}</div>
            </div>
            {data.recommendations[g.key].map(r => (
              <article key={r.num} className="rec">
                <div className="row1">
                  <span className="num">{r.num}</span>
                  <span className="ttl">{r.title}</span>
                </div>
                <div className="body">{r.body}</div>
                <div className="owner">{r.owner}</div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Golden({ data }) {
  const g = data.golden;
  return (
    <section className="block" id="golden">
      <div className="section-head">
        <div className="left">
          <div className="eyebrow">סיכום · תבנית הזהב</div>
          <h2>שלושת המשפטים</h2>
        </div>
        <div className="right">פתיחת סגירה — שיחת יניב 2</div>
      </div>
      <div className="golden">
        <div className="eyebrow">המסקנה שמתבלטת אחרי 10 שיחות</div>
        <p className="intro">
          {g.intro.replace('₪ 9,850', '')}
          <span className="figure">₪ 9,850</span>
          {' '}בשלושה משפטים פשוטים:
        </p>
        <ol>
          {g.sentences.map((s,i) => (
            <li key={i}>
              <span className="ord num">{String(i+1).padStart(2,'0')}</span>
              <span className="txt">״{s}״</span>
            </li>
          ))}
        </ol>
        <p className="outro">{g.outro}</p>
      </div>
    </section>
  );
}

window.Techniques = Techniques;
window.Failures = Failures;
window.Objections = Objections;
window.Reps = Reps;
window.Recommendations = Recommendations;
window.Golden = Golden;
