// ============================================
// CAL AI — PROGRESS PAGE
// ============================================

import { getState, getPastDaysTotals } from '../utils/store.js';

export function renderProgress() {
    const state = getState();
    const weekData = getPastDaysTotals(7);
    const targets = state.targets;

    const page = document.createElement('div');
    page.className = 'page progress-page';

    const maxCal = Math.max(targets.calories, ...weekData.map(d => d.calories));

    page.innerHTML = `
    <div class="page-header anim-fade-up">
      <h1 class="page-title">Progress</h1>
    </div>

    <!-- Weekly Calorie Chart -->
    <div class="section card anim-fade-up stagger-1">
      <div class="section-title">Weekly Calories</div>
      <div class="bar-chart" id="bar-chart">
        ${weekData.map((d, i) => {
        const h = maxCal > 0 ? (d.calories / maxCal) * 100 : 0;
        const over = d.calories > targets.calories;
        return `
          <div class="bar-chart__col stagger-${i + 1}">
            <span class="bar-chart__value">${d.calories > 0 ? d.calories : '-'}</span>
            <div class="bar-chart__bar-wrap">
              <div class="bar-chart__bar" style="--bar-h:${h}%;background:${over ? 'var(--accent-red)' : 'var(--accent-gradient)'}"></div>
            </div>
            <span class="bar-chart__label">${d.label}</span>
          </div>`;
    }).join('')}
      </div>
      <div class="bar-chart__goal-line">
        <span class="bar-chart__goal-label">Goal: ${targets.calories} cal</span>
      </div>
    </div>

    <!-- Macro Averages -->
    <div class="section card anim-fade-up stagger-3">
      <div class="section-title">7-Day Averages</div>
      <div class="avg-macros">
        ${renderAvgMacro('Protein', weekData, 'protein', targets.protein, 'var(--accent-secondary)')}
        ${renderAvgMacro('Carbs', weekData, 'carbs', targets.carbs, 'var(--accent-blue)')}
        ${renderAvgMacro('Fat', weekData, 'fat', targets.fat, 'var(--accent-orange)')}
      </div>
    </div>

    <!-- Streak -->
    <div class="section card anim-fade-up stagger-4">
      <div class="streak-display">
        <span class="streak-icon anim-pulse-glow">🔥</span>
        <div class="streak-info">
          <span class="streak-number">${state.streak}</span>
          <span class="streak-label">Day Streak</span>
        </div>
      </div>
    </div>

    <!-- Weight History -->
    <div class="section card anim-fade-up stagger-5">
      <div class="section-title">Weight History</div>
      ${state.weightHistory.length > 0 ? `
        <div class="weight-chart" id="weight-chart">
          ${renderWeightChart(state.weightHistory)}
        </div>
      ` : '<p class="text-muted" style="font-size:var(--font-sm);color:var(--text-muted);">No weight data yet</p>'}
    </div>

    <!-- Insights -->
    <div class="section anim-fade-up stagger-6">
      <div class="section-title">Insights</div>
      <div class="insights-grid">
        ${renderInsights(weekData, targets)}
      </div>
    </div>
  `;

    // Animate bars after mount
    requestAnimationFrame(() => {
        setTimeout(() => {
            page.querySelectorAll('.bar-chart__bar').forEach(bar => {
                bar.style.transition = 'height 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                bar.style.height = bar.style.getPropertyValue('--bar-h');
            });
        }, 200);
    });

    return page;
}

function renderAvgMacro(label, data, key, target, color) {
    const daysWithData = data.filter(d => d[key] > 0);
    const avg = daysWithData.length > 0 ? Math.round(daysWithData.reduce((s, d) => s + d[key], 0) / daysWithData.length) : 0;
    const pct = Math.min((avg / target) * 100, 100);
    return `
    <div class="avg-macro">
      <div class="avg-macro__header">
        <span class="avg-macro__label" style="color:${color}">${label}</span>
        <span class="avg-macro__value">${avg}g / ${target}g</span>
      </div>
      <div class="avg-macro__track">
        <div class="avg-macro__fill" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>
  `;
}

function renderWeightChart(history) {
    if (history.length < 2) {
        return `<p style="font-size:var(--font-sm);color:var(--text-muted);">Log more weight entries to see trends</p>`;
    }
    const recent = history.slice(-10);
    const min = Math.min(...recent.map(h => h.weight)) - 2;
    const max = Math.max(...recent.map(h => h.weight)) + 2;
    const range = max - min || 1;

    return `
    <div class="weight-line-chart">
      <svg viewBox="0 0 ${recent.length * 50} 100" class="weight-svg">
        <polyline
          points="${recent.map((h, i) => `${i * 50 + 25},${100 - ((h.weight - min) / range) * 80 - 10}`).join(' ')}"
          fill="none" stroke="url(#weightGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        />
        ${recent.map((h, i) => `
          <circle cx="${i * 50 + 25}" cy="${100 - ((h.weight - min) / range) * 80 - 10}" r="4" fill="var(--accent-primary)" />
        `).join('')}
        <defs>
          <linearGradient id="weightGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="var(--accent-primary)"/>
            <stop offset="100%" stop-color="var(--accent-secondary)"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="weight-labels">
        ${recent.map(h => `<span>${h.weight}kg</span>`).join('')}
      </div>
    </div>
  `;
}

function renderInsights(weekData, targets) {
    const daysLogged = weekData.filter(d => d.calories > 0).length;
    const avgCal = daysLogged > 0 ? Math.round(weekData.reduce((s, d) => s + d.calories, 0) / daysLogged) : 0;
    const onTrack = avgCal <= targets.calories && avgCal >= targets.calories * 0.8;

    return `
    <div class="insight-card card anim-fade-up">
      <span class="insight-card__icon">${onTrack ? '✅' : '⚠️'}</span>
      <div><strong>${avgCal}</strong> avg cal/day</div>
    </div>
    <div class="insight-card card anim-fade-up stagger-1">
      <span class="insight-card__icon">📅</span>
      <div><strong>${daysLogged}/7</strong> days logged</div>
    </div>
  `;
}

export const progressStyles = `
  .bar-chart { display:flex; align-items:flex-end; gap:var(--space-2); height:160px; padding-top:var(--space-4); }
  .bar-chart__col { flex:1; display:flex; flex-direction:column; align-items:center; gap:var(--space-1); height:100%; }
  .bar-chart__value { font-size:0.6rem; color:var(--text-muted); }
  .bar-chart__bar-wrap { flex:1; width:100%; display:flex; align-items:flex-end; }
  .bar-chart__bar { width:100%; height:0%; border-radius:var(--radius-sm) var(--radius-sm) 0 0; min-height:2px; }
  .bar-chart__label { font-size:var(--font-xs); color:var(--text-muted); font-weight:500; }
  .bar-chart__goal-line { text-align:right; margin-top:var(--space-2); }
  .bar-chart__goal-label { font-size:var(--font-xs); color:var(--text-muted); }
  .avg-macros { display:flex; flex-direction:column; gap:var(--space-3); }
  .avg-macro__header { display:flex; justify-content:space-between; margin-bottom:var(--space-1); }
  .avg-macro__label { font-size:var(--font-sm); font-weight:600; }
  .avg-macro__value { font-size:var(--font-xs); color:var(--text-muted); }
  .avg-macro__track { height:6px; background:var(--bg-elevated); border-radius:var(--radius-full); overflow:hidden; }
  .avg-macro__fill { height:100%; border-radius:var(--radius-full); transition:width 0.8s var(--ease-out); }
  .streak-display { display:flex; align-items:center; gap:var(--space-4); }
  .streak-icon { font-size:2.5rem; }
  .streak-number { font-size:var(--font-3xl); font-weight:800; display:block; line-height:1; }
  .streak-label { font-size:var(--font-xs); color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; }
  .weight-line-chart { overflow-x:auto; }
  .weight-svg { width:100%; height:100px; }
  .weight-labels { display:flex; justify-content:space-around; font-size:0.6rem; color:var(--text-muted); margin-top:var(--space-1); }
  .insights-grid { display:flex; gap:var(--space-3); }
  .insight-card { flex:1; display:flex; align-items:center; gap:var(--space-2); padding:var(--space-3) var(--space-4); font-size:var(--font-sm); }
  .insight-card__icon { font-size:1.25rem; }
`;
