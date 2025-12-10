// A lightweight dataset + smart defaults for weeks 4–40.
// We include richer copy for milestone weeks and fallback text for others.

const WEEK_OVERRIDES = {
  4:  { size: "Poppy seed (~1–2 mm)", short: "Implantation starts.", description: "The embryo is implanting in the uterine lining. Hormones begin rising, which may lead to early signs like fatigue or tender breasts." },
  5:  { size: "Sesame seed (~2 mm)", short: "Heartbeat begins soon.", description: "The neural tube is forming; the heart and circulatory system begin to develop. A positive home test is common now." },
  6:  { size: "Lentil (~3–5 mm)", short: "Early heartbeat.", description: "Tiny heart is starting to beat, and facial features begin to take shape. Nausea may intensify for some." },
  8:  { size: "Raspberry (~1.6 cm)", short: "Organs forming.", description: "Major organs continue forming. Fingers and toes are emerging. You might be scheduling a first prenatal appointment." },
  12: { size: "Lime (~5.4 cm)", short: "First trimester wrap.", description: "Reflexes develop; baby can open and close fingers. Risk of miscarriage decreases after week 12 for many pregnancies." },
  16: { size: "Avocado (~11–12 cm)", short: "Movements soon felt.", description: "Muscles strengthen and the baby may make coordinated movements. Some will start to feel 'quickening' within the next few weeks." },
  20: { size: "Banana (~25 cm head-to-heel)", short: "Anatomy scan time.", description: "Mid-pregnancy anatomy scan often occurs around now. Baby can hear sounds; you might notice regular movement patterns." },
  24: { size: "Ear of corn (~30 cm)", short: "Lung branches form.", description: "The lungs develop bronchioles and alveolar ducts. You may feel frequent movements and kicks." },
  28: { size: "Eggplant (~37 cm)", short: "Third trimester!", description: "Eyes can open and close; brain tissue continues rapid growth. Discuss birth preferences and classes if you haven’t yet." },
  32: { size: "Butternut squash (~41–43 cm)", short: "More fat layers.", description: "Baby gains fat under the skin and practices breathing motions. You may notice stronger, more defined kicks and rolls." },
  36: { size: "Honeydew melon (~47–48 cm)", short: "Getting into position.", description: "Many babies shift head-down. Space is tighter; movements feel slower but stronger. Pack your hospital bag." },
  40: { size: "Small pumpkin (~50–52 cm)", short: "Due date week.", description: "You’ve reached full term. Baby’s organs are developed and ready for life outside the womb. Be mindful of labor signs." }
};

// Default size bands to keep the UI informative even for non-override weeks
const SIZE_BANDS = [
  { range: [4, 6],   size: "Tiny seed (1–5 mm)" },
  { range: [7, 9],   size: "Blueberry to grape (~1–2.5 cm)" },
  { range: [10, 13], size: "Plum to lemon (~3–7 cm)" },
  { range: [14, 17], size: "Peach to avocado (~8–12 cm)" },
  { range: [18, 21], size: "Bell pepper to banana (~14–25 cm)" },
  { range: [22, 25], size: "Grapefruit to corn (~27–30+ cm)" },
  { range: [26, 29], size: "Cucumber to eggplant (~35–38 cm)" },
  { range: [30, 33], size: "Cabbage to squash (~40–43 cm)" },
  { range: [34, 37], size: "Pineapple to honeydew (~45–48 cm)" },
  { range: [38, 40], size: "Watermelon-ish (~49–52 cm)" }
];

function defaultSizeForWeek(week) {
  for (const band of SIZE_BANDS) {
    const [a,b] = band.range;
    if (week >= a && week <= b) return band.size;
  }
  return "Growing baby";
}

function defaultText(week) {
  // Gentle, generic development narrative
  if (week < 4) return {
    size: "Microscopic",
    short: "Pre-implantation.",
    description: "Very early changes are happening. Once implantation occurs, hormones rise and pregnancy progresses."
  };

  let short = "Development continues.";
  if (week < 10) short = "Foundational organs forming.";
  else if (week < 14) short = "First trimester milestones.";
  else if (week < 20) short = "Movement & growth.";
  else if (week < 28) short = "Senses and body systems maturing.";
  else if (week < 34) short = "Rapid weight gain and brain growth.";
  else short = "Full-term preparations.";

  const description = [
    `Week ${week} brings steady growth as organs and systems mature.`,
    `Movements may become more noticeable over time.`,
    `Your care team can personalize timing for visits and scans.`
  ].join(" ");

  return {
    size: defaultSizeForWeek(week),
    short,
    description
  };
}

function getWeekData(week) {
  if (WEEK_OVERRIDES[week]) return WEEK_OVERRIDES[week];
  return defaultText(week);
}
