// ============================================
// CAL AI — MEAL PLAN PAGE
// ============================================

import { getState } from '../utils/store.js';
import { generateMealPlan } from '../utils/mock-ai.js';
import { addFoodEntry } from '../utils/store.js';
import { showToast } from '../components/Toast.js';

export function renderMealPlan() {
    const page = document.createElement('div');
    page.className = 'page meal-plan-page';

    page.innerHTML = `
    <div class="page-header anim-fade-up">
      <h1 class="page-title">Meal Plan</h1>
    </div>
    <p class="meal-plan-desc anim-fade-up stagger-1">AI-generated meal plan based on your goals</p>
    <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-2" id="generate-plan-btn">
      ✨ Generate Meal Plan
    </button>
    <div id="meal-plan-results" class="meal-plan-results"></div>
  `;

    page.querySelector('#generate-plan-btn').addEventListener('click', async () => {
        const btn = page.querySelector('#generate-plan-btn');
        const results = page.querySelector('#meal-plan-results');
        btn.disabled = true;
        btn.textContent = '⏳ Generating...';

        results.innerHTML = `
      <div class="skeleton" style="height:100px;margin-top:16px;"></div>
      <div class="skeleton" style="height:100px;margin-top:8px;"></div>
      <div class="skeleton" style="height:100px;margin-top:8px;"></div>
      <div class="skeleton" style="height:100px;margin-top:8px;"></div>
    `;

        const state = getState();
        const plan = await generateMealPlan(state.profile);
        btn.disabled = false;
        btn.textContent = '✨ Regenerate';
        results.innerHTML = '';

        if (plan.success) {
            // Summary card
            const summary = document.createElement('div');
            summary.className = 'meal-plan-summary card anim-fade-up';
            summary.innerHTML = `
        <div class="section-title">Daily Totals</div>
        <div class="plan-totals">
          <div class="plan-total"><span class="plan-total__val gradient-text">${plan.totalCalories}</span><span class="plan-total__lbl">cal</span></div>
          <div class="plan-total"><span class="plan-total__val" style="color:var(--accent-secondary)">${plan.totalProtein}g</span><span class="plan-total__lbl">protein</span></div>
          <div class="plan-total"><span class="plan-total__val" style="color:var(--accent-blue)">${plan.totalCarbs}g</span><span class="plan-total__lbl">carbs</span></div>
          <div class="plan-total"><span class="plan-total__val" style="color:var(--accent-orange)">${plan.totalFat}g</span><span class="plan-total__lbl">fat</span></div>
        </div>
      `;
            results.appendChild(summary);

            // Meal cards
            plan.plan.forEach((meal, i) => {
                const card = document.createElement('div');
                card.className = 'meal-plan-card card anim-fade-up';
                card.style.animationDelay = `${(i + 1) * 100}ms`;
                card.innerHTML = `
          <div class="meal-plan-card__header">
            <span class="meal-plan-card__type">${meal.meal}</span>
            <span class="meal-plan-card__cal">${meal.calories} cal</span>
          </div>
          <div class="meal-plan-card__body">
            <span class="meal-plan-card__emoji">${meal.emoji}</span>
            <div class="meal-plan-card__info">
              <span class="meal-plan-card__name">${meal.name}</span>
              <span class="meal-plan-card__macros">P: ${meal.protein}g · C: ${meal.carbs}g · F: ${meal.fat}g</span>
            </div>
          </div>
          <div class="meal-plan-card__actions">
            <button class="btn btn-secondary btn-sm add-plan-btn">+ Add to Log</button>
            <button class="btn btn-ghost btn-sm swap-btn">🔄 Swap</button>
          </div>
        `;

                card.querySelector('.add-plan-btn').addEventListener('click', () => {
                    addFoodEntry({ name: meal.name, emoji: meal.emoji, serving: '1 serving', calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat, meal: meal.meal });
                    showToast(`${meal.name} added to ${meal.meal}!`);
                });

                card.querySelector('.swap-btn').addEventListener('click', async () => {
                    card.style.animation = 'spin 0.4s var(--ease-out)';
                    const newPlan = await generateMealPlan(state.profile);
                    const newMeal = newPlan.plan.find(m => m.meal === meal.meal) || newPlan.plan[0];
                    card.querySelector('.meal-plan-card__emoji').textContent = newMeal.emoji;
                    card.querySelector('.meal-plan-card__name').textContent = newMeal.name;
                    card.querySelector('.meal-plan-card__cal').textContent = newMeal.calories + ' cal';
                    card.querySelector('.meal-plan-card__macros').textContent = `P: ${newMeal.protein}g · C: ${newMeal.carbs}g · F: ${newMeal.fat}g`;
                    card.style.animation = 'scaleIn 0.3s var(--ease-spring)';
                    Object.assign(meal, newMeal);
                });

                results.appendChild(card);
            });
        }
    });

    return page;
}

export const mealPlanStyles = `
  .meal-plan-desc { font-size:var(--font-sm); color:var(--text-muted); margin-bottom:var(--space-4); }
  .meal-plan-results { margin-top:var(--space-4); display:flex; flex-direction:column; gap:var(--space-3); }
  .plan-totals { display:flex; justify-content:space-between; margin-top:var(--space-2); }
  .plan-total { display:flex; flex-direction:column; align-items:center; }
  .plan-total__val { font-size:var(--font-lg); font-weight:700; }
  .plan-total__lbl { font-size:var(--font-xs); color:var(--text-muted); }
  .meal-plan-card__header { display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); }
  .meal-plan-card__type { font-size:var(--font-xs); font-weight:600; color:var(--accent-primary); text-transform:uppercase; letter-spacing:0.05em; }
  .meal-plan-card__cal { font-size:var(--font-sm); font-weight:600; }
  .meal-plan-card__body { display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-3); }
  .meal-plan-card__emoji { font-size:2rem; }
  .meal-plan-card__name { font-size:var(--font-base); font-weight:600; display:block; }
  .meal-plan-card__macros { font-size:var(--font-xs); color:var(--text-muted); display:block; margin-top:2px; }
  .meal-plan-card__actions { display:flex; gap:var(--space-2); }
  .btn-sm { padding:var(--space-1) var(--space-3); font-size:var(--font-xs); }
`;
