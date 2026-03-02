// ============================================
// CAL AI — DASHBOARD PAGE
// ============================================

import { getState, getTodayTotals, getTodayLog, removeFoodEntry } from '../utils/store.js';
import { createCalorieRing, calorieRingStyles } from '../components/CalorieRing.js';
import { createMacroBar, macroBarStyles } from '../components/MacroBar.js';
import { createWaterTracker, waterTrackerStyles } from '../components/WaterTracker.js';
import { createFoodCard, foodCardStyles } from '../components/FoodCard.js';
import { navigate } from '../utils/router.js';

export function renderDashboard() {
    const state = getState();
    const totals = getTodayTotals();
    const log = getTodayLog();
    const targets = state.targets;

    const page = document.createElement('div');
    page.className = 'page dashboard-page';

    // Header
    const header = document.createElement('div');
    header.className = 'page-header anim-fade-up';
    header.innerHTML = `
    <div>
      <span class="dashboard-greeting">Today</span>
      <h1 class="page-title">${getGreeting()}</h1>
    </div>
    <div class="dashboard-streak ${state.streak > 0 ? 'anim-pulse-glow' : ''}">
      <span class="dashboard-streak__icon">🔥</span>
      <span class="dashboard-streak__count">${state.streak}</span>
    </div>
  `;
    page.appendChild(header);

    // Calorie Ring
    const ringSection = document.createElement('div');
    ringSection.className = 'section anim-fade-up stagger-1';
    const ring = createCalorieRing(totals.calories, targets.calories);
    ringSection.appendChild(ring);
    page.appendChild(ringSection);

    // Macro Bars
    const macroSection = document.createElement('div');
    macroSection.className = 'section card anim-fade-up stagger-2';
    macroSection.innerHTML = '<div class="section-title">Macros</div>';
    macroSection.appendChild(createMacroBar('Protein', totals.protein, targets.protein, 'var(--accent-secondary)'));
    macroSection.appendChild(createMacroBar('Carbs', totals.carbs, targets.carbs, 'var(--accent-blue)'));
    macroSection.appendChild(createMacroBar('Fat', totals.fat, targets.fat, 'var(--accent-orange)'));
    page.appendChild(macroSection);

    // Quick Actions
    const actions = document.createElement('div');
    actions.className = 'section quick-actions anim-fade-up stagger-3';
    actions.innerHTML = `
    <button class="quick-action-btn" id="action-scan">
      <span class="quick-action-btn__icon">📸</span>
      <span>Scan Food</span>
    </button>
    <button class="quick-action-btn" id="action-search">
      <span class="quick-action-btn__icon">🔍</span>
      <span>Search</span>
    </button>
    <button class="quick-action-btn" id="action-plan">
      <span class="quick-action-btn__icon">📋</span>
      <span>Meal Plan</span>
    </button>
  `;
    actions.querySelector('#action-scan').addEventListener('click', () => navigate('/log'));
    actions.querySelector('#action-search').addEventListener('click', () => navigate('/search'));
    actions.querySelector('#action-plan').addEventListener('click', () => navigate('/meal-plan'));
    page.appendChild(actions);

    // Water Tracker
    const waterSection = document.createElement('div');
    waterSection.className = 'section anim-fade-up stagger-4';
    waterSection.appendChild(createWaterTracker());
    page.appendChild(waterSection);

    // Recent Meals
    const mealsSection = document.createElement('div');
    mealsSection.className = 'section anim-fade-up stagger-5';
    mealsSection.innerHTML = `
    <div class="section-header">
      <span class="section-title">Today's Meals</span>
      <button class="btn btn-ghost" id="add-meal-btn">+ Add</button>
    </div>
  `;
    mealsSection.querySelector('#add-meal-btn').addEventListener('click', () => navigate('/log'));

    if (log.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state card';
        empty.innerHTML = `
      <span class="empty-state__icon">🍽️</span>
      <span class="empty-state__text">No meals logged today</span>
      <button class="btn btn-primary" id="log-first-meal">Log your first meal</button>
    `;
        empty.querySelector('#log-first-meal').addEventListener('click', () => navigate('/log'));
        mealsSection.appendChild(empty);
    } else {
        const mealList = document.createElement('div');
        mealList.className = 'meal-list';
        log.forEach((entry, i) => {
            const card = createFoodCard(entry, {
                animDelay: i * 60,
                onRemove: (food) => {
                    removeFoodEntry(food.id);
                    // Re-render dashboard
                    const app = document.getElementById('app');
                    if (app) {
                        const nav = app.querySelector('.bottom-nav');
                        app.innerHTML = '';
                        app.appendChild(renderDashboard());
                        if (nav) app.appendChild(nav);
                    }
                },
            });
            mealList.appendChild(card);
        });
        mealsSection.appendChild(mealList);
    }
    page.appendChild(mealsSection);

    return page;
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning ☀️';
    if (h < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
}

export const dashboardStyles = `
  .dashboard-greeting {
    font-size: var(--font-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .dashboard-streak {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    background: var(--bg-card);
    border-radius: var(--radius-full);
    border: 1px solid var(--border-subtle);
  }
  .dashboard-streak__icon {
    font-size: 1.2rem;
  }
  .dashboard-streak__count {
    font-size: var(--font-sm);
    font-weight: 700;
  }

  /* Quick Actions */
  .quick-actions {
    display: flex;
    gap: var(--space-3);
  }
  .quick-action-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    font-size: var(--font-xs);
    font-weight: 500;
    color: var(--text-secondary);
    transition: all var(--duration-normal) var(--ease-out);
  }
  .quick-action-btn:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-accent);
    color: var(--text-primary);
    box-shadow: var(--shadow-glow);
  }
  .quick-action-btn:active {
    transform: scale(0.96);
  }
  .quick-action-btn__icon {
    font-size: 1.5rem;
  }

  /* Section Header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  /* Meal List */
  .meal-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-8);
    text-align: center;
  }
  .empty-state__icon {
    font-size: 2.5rem;
    opacity: 0.5;
  }
  .empty-state__text {
    font-size: var(--font-sm);
    color: var(--text-muted);
  }
`;
