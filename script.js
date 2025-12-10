// Convert cm to in if needed
function convertUnits(size, unit) {
  if (unit === "in" && size.includes("cm")) {
    return size.replace(/([\d.]+)/g, (m) => (parseFloat(m) / 2.54).toFixed(1))
      .replace(/cm/g, "in");
  }
  return size;
}

function parseQuery() {
  const params = new URLSearchParams(window.location.search);
  return {
    mode: params.get("mode") || "lmp",
    dateStr: params.get("date") || "",
    cycleLen: parseInt(params.get("cycle") || "28"),
    lang: params.get("lang") || localStorage.getItem("preg_lang") || "en",
    unit: params.get("unit") || localStorage.getItem("preg_unit") || "cm"
  };
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function diffInDays(a, b) { return Math.floor((a - b) / 86400000); }
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function calculateFromInput({ mode, dateStr, cycleLen }) {
  const entered = new Date(dateStr);
  const cycleAdj = (cycleLen || 28) - 28;
  const lmp = mode === "conception" ? addDays(entered, -14) : entered;
  const edd = addDays(lmp, 280 + cycleAdj);
  const gaDays = Math.max(diffInDays(new Date(), lmp), 0);
  const weeks = Math.floor(gaDays / 7);
  const days = gaDays % 7;
  return { lmp, edd, weeks, days, entered, mode };
}

function renderSummary({ mode, entered, edd, weeks, days }) {
  document.getElementById("summary-mode").textContent = mode === "conception" ? "Conception" : "LMP";
  document.getElementById("summary-date").textContent = formatDate(entered);
  document.getElementById("summary-edd").textContent = formatDate(edd);
  document.getElementById("summary-ga").textContent = `${weeks} weeks ${days} days`;
}

function renderCurrentWeek(weeks, unit) {
  const data = getWeekData(clamp(weeks, 4, 40));
  const box = document.getElementById("current-week-content");
  box.innerHTML = `<div class="week-num">Week ${weeks}</div>
                   <strong>Size:</strong> ${convertUnits(data.size, unit)}<br/>
                   <p>${data.description}</p>`;
}

function renderRecommendations(weeks) {
  const recs = [
    "Take prenatal vitamins", "Eat balanced meals", "Stay hydrated", "Get enough sleep"
  ];
  document.getElementById("rec-list").innerHTML = recs.map(r => `<li>${r}</li>`).join("");
}

function renderWeeksGrid(weeks, unit) {
  const grid = document.getElementById("weeks-grid");
  grid.innerHTML = "";
  for (let w = 4; w <= 40; w++) {
    const data = getWeekData(w);
    const card = document.createElement("div");
    card.className = "week-card" + (w === weeks ? " active" : "");
    card.innerHTML = `<div class="week-num">W${w}</div>
                      <div class="tiny"><strong>${convertUnits(data.size, unit)}</strong></div>
                      <div class="tiny">${data.short}</div>`;
    grid.appendChild(card);
  }
}

function renderDevelopmentPage() {
  const q = parseQuery();
  const r = calculateFromInput(q);
  renderSummary(r);
  renderCurrentWeek(r.weeks, q.unit);
  renderRecommendations(r.weeks);
  renderWeeksGrid(r.weeks, q.unit);
}
