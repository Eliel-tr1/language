/* App — composes everything. Handles nav scroll, drawer, tweaks. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "regular",
  "accent": "#C49A4A",
  "showExec": true,
  "showGoldenQuote": true
}/*EDITMODE-END*/;

const ACCENT_THEMES = {
  '#C49A4A': { deep: '#A57E2E', soft: '#E6CF94', tint: '#F4E9CC', wash: '#FBF4DD' }, // Deep Gold
  '#10438B': { deep: '#0C3568', soft: '#7FA5D0', tint: '#D8E4F2', wash: '#EFF4FB' }, // Royal Blue
  '#C4AA78': { deep: '#9A8556', soft: '#E2D2AA', tint: '#F1E8D0', wash: '#F9F3E2' }, // Champagne
};

function App() {
  const data = window.RESEARCH;
  const [active, setActive] = React.useState('hero');
  const [pickedId, setPickedId] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* density class on body */
  React.useEffect(() => {
    document.body.className = `density-${t.density}`;
  }, [t.density]);

  /* accent token override */
  React.useEffect(() => {
    const root = document.documentElement.style;
    const c = ACCENT_THEMES[t.accent] || ACCENT_THEMES['#C49A4A'];
    root.setProperty('--rv-gold',      t.accent);
    root.setProperty('--rv-gold-deep', c.deep);
    root.setProperty('--rv-gold-soft', c.soft);
    root.setProperty('--rv-gold-tint', c.tint);
    root.setProperty('--rv-gold-wash', c.wash);
  }, [t.accent]);

  /* observe sections for active nav */
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    document.querySelectorAll('section.block').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const picked = data.calls.find(c => c.id === pickedId);

  return (
    <div className="app">
      <Sidebar active={active} onNav={onNav} />
      <main className="main">
        <Topbar />
        <div className="page">
          <Hero data={data} />
          <KpiRow data={data} />
          {t.showExec && <ExecCallout />}
          <CallsTable data={data} onPick={setPickedId} />
          <Techniques data={data} />
          <Failures data={data} />
          <Objections data={data} />
          <Reps data={data} />
          <Recommendations data={data} />
          {t.showGoldenQuote && <Golden data={data} />}

          <footer className="foot">
            <div className="left">
              דוח מטא-ניתוח אסטרטגי · Vitrue Research × האוניברסיטה העברית · קורסי AI
            </div>
            <div className="right">10/10 שיחות · גרסה 1.0 · מאי 2026</div>
          </footer>
        </div>
      </main>

      <CallDrawer call={picked} onClose={() => setPickedId(null)} />

      <TweaksPanel>
        <TweakSection label="צבע נושא" />
        <TweakColor
          label="צבע מבטא"
          value={t.accent}
          options={Object.keys(ACCENT_THEMES)}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="פריסה ותצוגה" />
        <TweakRadio
          label="צפיפות"
          value={t.density}
          options={['compact', 'regular', 'comfortable']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="הצג Callout מסקנה"
          value={t.showExec}
          onChange={(v) => setTweak('showExec', v)}
        />
        <TweakToggle
          label="הצג ׳תבנית הזהב׳"
          value={t.showGoldenQuote}
          onChange={(v) => setTweak('showGoldenQuote', v)}
        />

        <TweakSection label="ניווט מהיר" />
        {NAV.slice(0, 5).map(n => (
          <TweakButton
            key={n.id}
            label={n.label}
            onClick={() => onNav(n.id)}
          />
        ))}
      </TweaksPanel>
    </div>
  );
}

window.App = App;
