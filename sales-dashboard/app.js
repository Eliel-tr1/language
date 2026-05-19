/* רינדור הדשבורד מתוך REPORT (data.js) */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const scoreColor = (s) =>
    s >= 9 ? "#2e8b57" : s >= 7.5 ? "#5a9b3e" : s >= 6.5 ? "#c89b3c" : "#c0392b";

  const outcomeClass = (o) =>
    o === "נסגר" ? "win" : o === "לא נסגר" ? "lose" : "mid";

  /* ---- Hero + summary ---- */
  $("#hero-title").textContent = REPORT.meta.title;
  $("#hero-sub").textContent = REPORT.meta.subtitle;
  $("#hero-tag").textContent = REPORT.meta.tagline;
  $("#summary").textContent = REPORT.meta.summary;
  $("#conclusion").textContent = REPORT.meta.conclusion;

  /* ---- Tabs ---- */
  const TABS = [
    ["overview", "תקציר"],
    ["calls", "10 השיחות"],
    ["winning", "מה עובד"],
    ["weaknesses", "מה לא עובד"],
    ["objections", "התנגדויות"],
    ["reps", "הנציגים"],
    ["chatbot", "הצ'אטבוט"],
    ["plan", "תוכנית פעולה"],
  ];
  const tabsNav = $("#tabs");
  TABS.forEach(([key, label], i) => {
    const b = el("button", "tab" + (i === 0 ? " active" : ""), label);
    b.dataset.target = key;
    b.addEventListener("click", () => activate(key));
    tabsNav.appendChild(b);
  });
  function activate(key) {
    document.querySelectorAll(".tab").forEach((t) =>
      t.classList.toggle("active", t.dataset.target === key)
    );
    document.querySelectorAll(".panel").forEach((p) =>
      p.classList.toggle("hidden", p.dataset.panel !== key)
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---- KPIs ---- */
  const kg = $("#kpi-grid");
  REPORT.kpis.forEach((k) => {
    kg.appendChild(
      el(
        "div",
        "kpi",
        `<div class="kpi-icon">${k.icon}</div>
         <div class="kpi-value">${k.value}</div>
         <div class="kpi-label">${k.label}</div>`
      )
    );
  });

  /* ---- Score bar chart ---- */
  const sc = $("#score-chart");
  REPORT.calls.forEach((c) => {
    const row = el("div", "bar-row");
    row.appendChild(el("div", "bar-label", `${c.id}. ${c.lead}`));
    const track = el("div", "bar-track");
    const fill = el("div", "bar-fill", `${c.score}`);
    fill.style.background = scoreColor(c.score);
    fill.style.width = "0%";
    track.appendChild(fill);
    row.appendChild(track);
    sc.appendChild(row);
    requestAnimationFrame(() => {
      setTimeout(() => (fill.style.width = (c.score / 10) * 100 + "%"), 60);
    });
  });

  /* ---- Conversion donut ---- */
  const closed = REPORT.calls.filter((c) => c.outcome === "נסגר").length;
  const total = REPORT.calls.length;
  const pct = Math.round((closed / total) * 100);
  $("#conv-pct").textContent = pct + "%";
  const donut = $("#donut");
  const R = 50,
    C = 2 * Math.PI * R;
  const ns = "http://www.w3.org/2000/svg";
  const mkCircle = (color, dash, offset, w) => {
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", 60);
    c.setAttribute("cy", 60);
    c.setAttribute("r", R);
    c.setAttribute("fill", "none");
    c.setAttribute("stroke", color);
    c.setAttribute("stroke-width", w);
    if (dash != null) {
      c.setAttribute("stroke-dasharray", `${dash} ${C - dash}`);
      c.setAttribute("stroke-dashoffset", offset);
    }
    return c;
  };
  donut.appendChild(mkCircle("#e3e7ef", null, 0, 18));
  const seg = mkCircle("#2e8b57", 0, 0, 18);
  donut.appendChild(seg);
  setTimeout(() => {
    seg.style.transition = "stroke-dasharray 1s ease";
    seg.setAttribute("stroke-dasharray", `${(pct / 100) * C} ${C}`);
  }, 200);

  /* ---- Calls table ---- */
  const body = $("#calls-body");
  let sortKey = "id",
    sortAsc = true,
    repFilter = "all",
    outFilter = "all";

  function renderCalls() {
    body.innerHTML = "";
    let rows = REPORT.calls.filter(
      (c) =>
        (repFilter === "all" || c.rep === repFilter) &&
        (outFilter === "all" ||
          (outFilter === "closed"
            ? c.outcome === "נסגר"
            : c.outcome !== "נסגר"))
    );
    rows.sort((a, b) => {
      let x = a[sortKey],
        y = b[sortKey];
      if (typeof x === "string") return sortAsc ? x.localeCompare(y, "he") : y.localeCompare(x, "he");
      return sortAsc ? x - y : y - x;
    });
    rows.forEach((c) => {
      const tr = el("tr", c.outcome === "נסגר" ? "closed" : "");
      const pill = `<span class="score-pill" style="background:${scoreColor(
        c.score
      )}">${c.score}</span>`;
      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.lead}</td>
        <td>${c.rep}</td>
        <td>${pill}</td>
        <td><span class="outcome-tag ${outcomeClass(c.outcome)}">${c.outcome}</span></td>
        <td>${c.note}</td>`;
      body.appendChild(tr);
    });
  }

  document.querySelectorAll("#calls-table th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const k = th.dataset.sort;
      if (sortKey === k) sortAsc = !sortAsc;
      else {
        sortKey = k;
        sortAsc = true;
      }
      renderCalls();
    });
  });

  const cf = $("#call-filters");
  const filterDefs = [
    { group: "out", val: "all", label: "כל התוצאות" },
    { group: "out", val: "closed", label: "✅ נסגרו" },
    { group: "out", val: "open", label: "פתוחות" },
    { group: "rep", val: "all", label: "כל הנציגים" },
    { group: "rep", val: "רז", label: "רז" },
    { group: "rep", val: "שחר", label: "שחר" },
    { group: "rep", val: "רון", label: "רון" },
  ];
  filterDefs.forEach((f) => {
    const isActive =
      (f.group === "out" && f.val === outFilter) ||
      (f.group === "rep" && f.val === repFilter);
    const chip = el("button", "chip" + (isActive ? " active" : ""), f.label);
    chip.dataset.group = f.group;
    chip.dataset.val = f.val;
    chip.addEventListener("click", () => {
      if (f.group === "out") outFilter = f.val;
      else repFilter = f.val;
      cf.querySelectorAll(`.chip[data-group="${f.group}"]`).forEach((c) =>
        c.classList.toggle("active", c.dataset.val === f.val)
      );
      renderCalls();
    });
    cf.appendChild(chip);
  });
  renderCalls();

  /* ---- Winning techniques ---- */
  const wg = $("#winning-grid");
  REPORT.winning.forEach((t) => {
    wg.appendChild(
      el(
        "div",
        "tech-card",
        `<h3><span class="medal">${t.medal}</span>${t.title}</h3>
         <p>${t.body}</p>
         <div class="action-box"><strong>✅ פעולה מומלצת:</strong> ${t.action}</div>`
      )
    );
  });

  /* ---- Weaknesses ---- */
  const wkg = $("#weak-grid");
  REPORT.weaknesses.forEach((w, i) => {
    wkg.appendChild(
      el(
        "div",
        "tech-card weak" + (w.urgent ? " urgent" : ""),
        `<h3>❌ ${i + 1}. ${w.title}${
          w.urgent ? '<span class="urgent-badge">דחוף</span>' : ""
        }</h3>
         <p>${w.body}</p>`
      )
    );
  });

  /* ---- Objections accordion ---- */
  const acc = $("#obj-accordion");
  REPORT.objections.forEach((o) => {
    const item = el("div", "acc-item");
    const head = el(
      "button",
      "acc-head",
      `<span class="acc-num">${o.n}</span>
       <span class="acc-title">${o.title}</span>
       <span class="acc-arrow">▼</span>`
    );
    const bd = el(
      "div",
      "acc-body",
      `<div class="calls-meta">הופיעה בשיחות: ${o.calls}</div>
       <div class="fix">${o.fix}</div>`
    );
    head.addEventListener("click", () => item.classList.toggle("open"));
    item.appendChild(head);
    item.appendChild(bd);
    acc.appendChild(item);
  });

  /* ---- Reps ---- */
  const rg = $("#reps-grid");
  REPORT.reps.forEach((r) => {
    rg.appendChild(
      el(
        "div",
        "rep-card",
        `<div class="rep-head"><span class="rank">${r.rank}</span><h3>${r.name}</h3></div>
         <div class="rep-stats">
           <div class="rep-stat"><b>${r.calls}</b><span>שיחות</span></div>
           <div class="rep-stat"><b>${r.closes}</b><span>סגירות</span></div>
           <div class="rep-stat"><b>${r.avg}</b><span>ציון ממוצע</span></div>
         </div>
         <div class="pro"><b>💪 חזק:</b> ${r.strong}</div>
         <div class="con"><b>⚠️ חולשות:</b> ${r.weak}</div>
         <div class="rep-note">${r.note}</div>`
      )
    );
  });

  /* ---- Chatbot ---- */
  const cl = $("#chatbot-list");
  REPORT.chatbot.forEach((u) => {
    cl.appendChild(
      el(
        "div",
        "upgrade",
        `<div class="un">${u.n}</div>
         <div><h4>${u.title}</h4><p>${u.body}</p></div>`
      )
    );
  });

  /* ---- Plan timeline ---- */
  const tl = $("#plan-timeline");
  REPORT.plan.forEach((p) => {
    const block = el("div", "phase");
    block.appendChild(
      el("div", "phase-head", `<span>${p.icon}</span><span>${p.phase}</span>`)
    );
    const items = el("div", "phase-items");
    p.items.forEach((it) => {
      items.appendChild(
        el(
          "div",
          "step",
          `<div class="sn">${it.n}</div><h4>${it.t}</h4><p>${it.d}</p>`
        )
      );
    });
    block.appendChild(items);
    tl.appendChild(block);
  });

  /* ---- Golden lines ---- */
  const gl = $("#golden-lines");
  REPORT.goldenLines.forEach((line) => gl.appendChild(el("li", null, line)));
})();
