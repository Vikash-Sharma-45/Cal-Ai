// ============================================
// CAL AI — FOOD SEARCH PAGE
// ============================================

import { searchFoods, FOOD_CATEGORIES } from '../data/foods.js';
import { addFoodEntry } from '../utils/store.js';
import { createFoodCard } from '../components/FoodCard.js';
import { showToast } from '../components/Toast.js';

let selectedCategory = 'All';

export function renderFoodSearch() {
    const page = document.createElement('div');
    page.className = 'page food-search-page';

    page.innerHTML = `
    <div class="page-header anim-fade-up">
      <h1 class="page-title">Search Foods</h1>
    </div>
    <div class="search-bar-wrap anim-fade-up stagger-1">
      <span class="search-bar-icon">🔍</span>
      <input type="text" class="input-field search-bar-input" placeholder="Search by name..." id="search-bar" autocomplete="off" />
    </div>
    <div class="category-chips anim-fade-up stagger-2" id="category-chips">
      ${FOOD_CATEGORIES.map(c => `
        <button class="chip ${selectedCategory === c ? 'active' : ''}" data-category="${c}">${c}</button>
      `).join('')}
    </div>
    <div class="search-page-results" id="search-page-results"></div>
  `;

    const input = page.querySelector('#search-bar');
    const results = page.querySelector('#search-page-results');
    const chips = page.querySelector('#category-chips');

    function updateResults() {
        const foods = searchFoods(input.value, selectedCategory).slice(0, 30);
        results.innerHTML = '';
        foods.forEach((food, i) => {
            const card = createFoodCard(food, {
                animDelay: i * 30,
                onAdd: (f) => {
                    addFoodEntry({ foodId: f.id, name: f.name, emoji: f.emoji, serving: f.serving, calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat, meal: 'Snack' });
                    showToast(`${f.name} added!`);
                },
            });
            results.appendChild(card);
        });
        if (input.value && foods.length === 0) {
            results.innerHTML = '<div class="empty-state card"><span class="empty-state__icon">🔍</span><span class="empty-state__text">No foods found</span></div>';
        }
    }

    input.addEventListener('input', updateResults);
    chips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip');
        if (!btn) return;
        selectedCategory = btn.dataset.category;
        chips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        updateResults();
    });
    updateResults();
    return page;
}

export const foodSearchStyles = `
  .search-bar-wrap { position:relative; margin-bottom:var(--space-4); }
  .search-bar-icon { position:absolute; left:var(--space-4); top:50%; transform:translateY(-50%); }
  .search-bar-input { padding-left:var(--space-10)!important; padding:var(--space-4); font-size:var(--font-base); }
  .category-chips { display:flex; gap:var(--space-2); overflow-x:auto; padding-bottom:var(--space-3); margin-bottom:var(--space-4); scrollbar-width:none; }
  .category-chips::-webkit-scrollbar { display:none; }
  .search-page-results { display:flex; flex-direction:column; gap:var(--space-2); }
`;
