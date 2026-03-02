// ============================================
// CAL AI — LOG MEAL PAGE
// ============================================

import { addFoodEntry } from '../utils/store.js';
import { scanFood, scanBarcode } from '../utils/mock-ai.js';
import { searchFoods } from '../data/foods.js';
import { createFoodCard, foodCardStyles } from '../components/FoodCard.js';
import { showToast } from '../components/Toast.js';

let activeTab = 'scan';
let selectedMeal = 'Lunch';

export function renderLogMeal() {
    const page = document.createElement('div');
    page.className = 'page log-meal-page';

    page.innerHTML = `
    <div class="page-header anim-fade-up">
      <h1 class="page-title">Log Meal</h1>
    </div>

    <!-- Meal Type Selector -->
    <div class="meal-type-selector anim-fade-up stagger-1">
      ${['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(m => `
        <button class="meal-type-btn ${selectedMeal === m ? 'active' : ''}" data-meal="${m}">${m}</button>
      `).join('')}
    </div>

    <!-- Tab Bar -->
    <div class="log-tabs anim-fade-up stagger-2">
      <button class="log-tab ${activeTab === 'scan' ? 'active' : ''}" data-tab="scan">📸 Scan</button>
      <button class="log-tab ${activeTab === 'search' ? 'active' : ''}" data-tab="search">🔍 Search</button>
      <button class="log-tab ${activeTab === 'barcode' ? 'active' : ''}" data-tab="barcode">📱 Barcode</button>
    </div>

    <!-- Tab Content -->
    <div class="log-content" id="log-content"></div>
  `;

    // Meal type toggle
    page.querySelectorAll('.meal-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMeal = btn.dataset.meal;
            page.querySelectorAll('.meal-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Tab switching
    page.querySelectorAll('.log-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            activeTab = tab.dataset.tab;
            page.querySelectorAll('.log-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTabContent(page);
        });
    });

    renderTabContent(page);
    return page;
}

function renderTabContent(page) {
    const container = page.querySelector('#log-content');
    container.innerHTML = '';
    container.className = 'log-content anim-fade-up';

    switch (activeTab) {
        case 'scan':
            renderScanTab(container);
            break;
        case 'search':
            renderSearchTab(container);
            break;
        case 'barcode':
            renderBarcodeTab(container);
            break;
    }
}

function renderScanTab(container) {
    container.innerHTML = `
    <div class="scan-area">
      <div class="scan-upload card">
        <div class="scan-upload__icon">📸</div>
        <h3 class="scan-upload__title">Snap a Photo</h3>
        <p class="scan-upload__desc">AI will identify your food and estimate calories</p>
        <label class="btn btn-primary btn-lg" for="food-photo-input">
          Take Photo / Upload
        </label>
        <input type="file" accept="image/*" id="food-photo-input" class="visually-hidden" capture="environment" />
      </div>
      <div id="scan-results"></div>
    </div>
  `;

    container.querySelector('#food-photo-input').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const results = container.querySelector('#scan-results');
        results.innerHTML = `
      <div class="scan-loading">
        <div class="scan-loading__spinner anim-spin">⚡</div>
        <p class="scan-loading__text">AI is analyzing your food...</p>
        <div class="skeleton" style="height:80px;margin-top:12px;"></div>
        <div class="skeleton" style="height:80px;margin-top:8px;width:90%;"></div>
      </div>
    `;

        try {
            const result = await scanFood(file);
            results.innerHTML = '';

            if (result.success && result.items.length > 0) {
                const header = document.createElement('div');
                header.className = 'scan-results-header anim-fade-up';
                header.innerHTML = `
          <span class="scan-results-title">✨ Detected ${result.items.length} item${result.items.length > 1 ? 's' : ''}</span>
          <span class="scan-results-time">${result.processingTime}</span>
        `;
                results.appendChild(header);

                result.items.forEach((item, i) => {
                    const card = createFoodCard(item, {
                        animDelay: i * 100,
                        onAdd: (food) => {
                            addFoodEntry({
                                foodId: food.id,
                                name: food.name,
                                emoji: food.emoji,
                                serving: food.serving,
                                calories: food.calories,
                                protein: food.protein,
                                carbs: food.carbs,
                                fat: food.fat,
                                meal: selectedMeal,
                            });
                            showToast(`${food.name} added to ${selectedMeal}!`);
                        },
                    });
                    results.appendChild(card);
                });
            }
        } catch (err) {
            results.innerHTML = '<p style="color:var(--accent-red);text-align:center;">Error scanning food. Try again.</p>';
        }
    });
}

function renderSearchTab(container) {
    container.innerHTML = `
    <div class="search-area">
      <div class="search-input-wrap">
        <span class="search-input-icon">🔍</span>
        <input type="text" class="input-field search-input" placeholder="Search foods..." id="food-search-input" autocomplete="off" />
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  `;

    const input = container.querySelector('#food-search-input');
    const results = container.querySelector('#search-results');

    input.addEventListener('input', () => {
        const query = input.value;
        const foods = searchFoods(query).slice(0, 20);

        results.innerHTML = '';
        foods.forEach((food, i) => {
            const card = createFoodCard(food, {
                animDelay: i * 40,
                showMacros: false,
                onAdd: (f) => {
                    addFoodEntry({
                        foodId: f.id,
                        name: f.name,
                        emoji: f.emoji,
                        serving: f.serving,
                        calories: f.calories,
                        protein: f.protein,
                        carbs: f.carbs,
                        fat: f.fat,
                        meal: selectedMeal,
                    });
                    showToast(`${f.name} added to ${selectedMeal}!`);
                },
            });
            results.appendChild(card);
        });

        if (query && foods.length === 0) {
            results.innerHTML = '<p class="search-empty">No foods found. Try a different search.</p>';
        }
    });

    // Trigger initial listing
    input.dispatchEvent(new Event('input'));
}

function renderBarcodeTab(container) {
    container.innerHTML = `
    <div class="barcode-area">
      <div class="scan-upload card">
        <div class="scan-upload__icon">📱</div>
        <h3 class="scan-upload__title">Scan Barcode</h3>
        <p class="scan-upload__desc">Enter a barcode number to look up nutrition</p>
        <div class="barcode-input-row">
          <input type="text" class="input-field" placeholder="Enter barcode..." id="barcode-input" />
          <button class="btn btn-primary" id="barcode-scan-btn">Scan</button>
        </div>
      </div>
      <div id="barcode-results"></div>
    </div>
  `;

    container.querySelector('#barcode-scan-btn').addEventListener('click', async () => {
        const input = container.querySelector('#barcode-input');
        const barcode = input.value.trim();
        if (!barcode) return;

        const results = container.querySelector('#barcode-results');
        results.innerHTML = `
      <div class="scan-loading">
        <div class="scan-loading__spinner anim-spin">📡</div>
        <p class="scan-loading__text">Looking up barcode...</p>
        <div class="skeleton" style="height:80px;margin-top:12px;"></div>
      </div>
    `;

        const result = await scanBarcode(barcode);
        results.innerHTML = '';

        if (result.success) {
            const card = createFoodCard(result.item, {
                onAdd: (food) => {
                    addFoodEntry({
                        foodId: food.id,
                        name: food.name,
                        emoji: food.emoji,
                        serving: food.serving,
                        calories: food.calories,
                        protein: food.protein,
                        carbs: food.carbs,
                        fat: food.fat,
                        meal: selectedMeal,
                    });
                    showToast(`${food.name} added to ${selectedMeal}!`);
                },
            });
            results.appendChild(card);
        }
    });
}

export const logMealStyles = `
  /* Meal Type Selector */
  .meal-type-selector {
    display: flex;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .meal-type-selector::-webkit-scrollbar { display: none; }
  .meal-type-btn {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--font-sm);
    font-weight: 500;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    white-space: nowrap;
    transition: all var(--duration-fast) var(--ease-out);
  }
  .meal-type-btn.active {
    background: rgba(163, 230, 53, 0.12);
    color: var(--accent-primary);
    border-color: var(--border-accent);
  }

  /* Tabs */
  .log-tabs {
    display: flex;
    gap: var(--space-1);
    background: var(--bg-secondary);
    padding: var(--space-1);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-5);
  }
  .log-tab {
    flex: 1;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--font-sm);
    font-weight: 500;
    color: var(--text-muted);
    text-align: center;
    transition: all var(--duration-fast) var(--ease-out);
  }
  .log-tab.active {
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: var(--shadow-sm);
  }

  /* Scan Area */
  .scan-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-8);
    text-align: center;
    border: 2px dashed var(--border-medium);
    background: var(--bg-secondary);
  }
  .scan-upload__icon {
    font-size: 2.5rem;
  }
  .scan-upload__title {
    font-size: var(--font-lg);
    font-weight: 600;
  }
  .scan-upload__desc {
    font-size: var(--font-sm);
    color: var(--text-muted);
  }

  /* Scan Loading */
  .scan-loading {
    text-align: center;
    padding: var(--space-6);
  }
  .scan-loading__spinner {
    font-size: 2rem;
    display: inline-block;
  }
  .scan-loading__text {
    font-size: var(--font-sm);
    color: var(--text-muted);
    margin-top: var(--space-2);
  }
  .scan-results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: var(--space-4) 0 var(--space-2);
  }
  .scan-results-title {
    font-size: var(--font-sm);
    font-weight: 600;
  }
  .scan-results-time {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }

  /* Search */
  .search-input-wrap {
    position: relative;
    margin-bottom: var(--space-4);
  }
  .search-input-icon {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
  }
  .search-input {
    padding-left: var(--space-10) !important;
  }
  .search-results {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .search-empty {
    text-align: center;
    color: var(--text-muted);
    padding: var(--space-8);
    font-size: var(--font-sm);
  }

  /* Barcode */
  .barcode-input-row {
    display: flex;
    gap: var(--space-2);
    width: 100%;
  }
  .barcode-input-row .input-field {
    flex: 1;
  }
`;
