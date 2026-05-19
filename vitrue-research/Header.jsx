/* Topbar + Hero + KPIs + Executive callout */

function Topbar() {
  return (
    <header className="topbar">
      <div className="crumbs">
        <span>Vitrue Research</span>
        <span className="sep">/</span>
        <span>האוניברסיטה העברית</span>
        <span className="sep">/</span>
        <span className="now">מטא-ניתוח מכירות · 10 שיחות</span>
      </div>
      <div className="actions">
        <button className="btn ghost sm"><RvIcon name="share" size={13} />שתף</button>
        <button className="btn ghost sm"><RvIcon name="download" size={13} />ייצוא PDF</button>
        <button className="btn primary sm"><RvIcon name="check" size={13} />דווח על תובנות</button>
      </div>
    </header>
  );
}

function Hero({ data }) {
  const { meta } = data;
  return (
    <section className="block" id="hero">
      <div className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">{meta.eyebrow}</div>
            <h1>
              עשר שיחות. שלושה נציגים.<br/>
              <em>שלושה משפטים</em> ששווים סגירה.
            </h1>
            <p className="subtitle">
              מטא-ניתוח של {meta.callsCount} שיחות מכירה ייחודיות לקורסי AI של האוניברסיטה העברית.
              זיהוי דפוסים חוזרים, נקודות חולשה מערכתיות וטכניקות מנצחות — עם {' '}
              <strong>12 פעולות אסטרטגיות</strong> לשיפור אחוז ההמרה.
            </p>
            <div className="hero-meta">
              <div className="cell">
                <span className="lbl">תקופת תיעוד</span>
                <span className="val">{meta.period}</span>
              </div>
              <div className="cell">
                <span className="lbl">צוות מנתח</span>
                <span className="val">{meta.analyst}</span>
              </div>
              <div className="cell">
                <span className="lbl">תבנית הזהב</span>
                <span className="val">שיחת יניב #{meta.goldenCallId} · ₪ {meta.closedValue.toLocaleString('he-IL')}</span>
              </div>
            </div>
          </div>
          <div className="hero-aside">
            <div className="lbl">אחוז המרה</div>
            <div className="big num">
              20<span className="pct">%</span>
            </div>
            <div className="desc">
              2 מתוך 10 שיחות נסגרו. רוב היתר לא נכשלו על מחיר או תוכן —
              אלא על היעדר ׳שמירת מקום אקטיבית׳ ו׳מועד מעקב מדויק׳.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiRow({ data }) {
  return (
    <section className="block" id="kpis">
      <div className="kpi-row">
        {data.kpis.map(k => (
          <div key={k.id} className={`kpi-tile ${k.tone || 'gold'}`}>
            <div className="lbl" dangerouslySetInnerHTML={{__html: k.label}}></div>
            <div className="val">
              <span className="num">{k.value}</span>
              {k.suffix && <span className="suf">{k.suffix}</span>}
            </div>
            <div className="foot">{k.foot}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExecCallout() {
  return (
    <section className="block">
      <div className="exec">
        <div className="diamond"><span>◆</span></div>
        <div>
          <div className="lbl">מסקנה מרכזית</div>
          <h3>
            רוב השיחות שלא נסגרו — לא נסגרו בגלל היעדר טכניקות סגירה אקטיביות.
            לא בגלל איכות התוכן או המחיר.
          </h3>
          <p>
            נציג יחיד — <span className="gold-name">רז</span> — הוכיח שניתן להעלות
            את אחוז הסגירה דרך שני מהלכים זולים ופשוטים: <span className="gold-name">׳שמירת מקום אקטיבית׳</span> במהלך
            השיחה, ו<span className="gold-name">׳Pivot מקצועי בלי גאווה׳</span> כאשר הפרופיל של הליד אינו תואם את הקורס שאליו נרשם.
          </p>
        </div>
      </div>
    </section>
  );
}

window.Topbar = Topbar;
window.Hero = Hero;
window.KpiRow = KpiRow;
window.ExecCallout = ExecCallout;
