// ============================================
// CAL AI — WATER TRACKER
// ============================================

import { getWaterToday, addWater, removeWater, getState } from '../utils/store.js';

export function createWaterTracker() {
    const target = getState().targets.water;
    const current = getWaterToday();

    const wrapper = document.createElement('div');
    wrapper.className = 'water-tracker card';
    wrapper.innerHTML = `
    <div class="water-tracker__header">
      <span class="water-tracker__title">💧 Water Intake</span>
      <span class="water-tracker__count">${current}/${target} glasses</span>
    </div>
    <div class="water-tracker__drops" id="water-drops">
      ${Array.from({ length: target }, (_, i) => `
        <button class="water-tracker__drop ${i < current ? 'filled' : ''}" data-index="${i}" aria-label="Water glass ${i + 1}">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z"
                  fill="${i < current ? 'var(--accent-blue)' : 'var(--bg-elevated)'}"
                  stroke="${i < current ? 'var(--accent-blue)' : 'var(--border-medium)'}"
                  stroke-width="1.5"/>
          </svg>
        </button>
      `).join('')}
    </div>
  `;

    // Event delegation
    wrapper.querySelector('#water-drops').addEventListener('click', (e) => {
        const btn = e.target.closest('.water-tracker__drop');
        if (!btn) return;
        const index = parseInt(btn.dataset.index);
        const currentCount = getWaterToday();

        if (index < currentCount) {
            // Remove water (clicked a filled one)
            removeWater();
        } else {
            // Add water
            addWater();
        }

        // Re-render
        updateWaterTracker(wrapper);
    });

    return wrapper;
}

function updateWaterTracker(wrapper) {
    const target = getState().targets.water;
    const current = getWaterToday();

    wrapper.querySelector('.water-tracker__count').textContent = `${current}/${target} glasses`;

    wrapper.querySelectorAll('.water-tracker__drop').forEach((btn, i) => {
        const filled = i < current;
        btn.classList.toggle('filled', filled);
        const path = btn.querySelector('path');
        if (path) {
            path.setAttribute('fill', filled ? 'var(--accent-blue)' : 'var(--bg-elevated)');
            path.setAttribute('stroke', filled ? 'var(--accent-blue)' : 'var(--border-medium)');
        }
        if (filled && !btn.classList.contains('was-filled')) {
            btn.classList.add('was-filled');
            btn.style.animation = 'scaleBounce 0.4s var(--ease-spring)';
            setTimeout(() => btn.style.animation = '', 400);
        } else if (!filled) {
            btn.classList.remove('was-filled');
        }
    });
}

export const waterTrackerStyles = `
  .water-tracker__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
  }
  .water-tracker__title {
    font-size: var(--font-sm);
    font-weight: 600;
  }
  .water-tracker__count {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }
  .water-tracker__drops {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    flex-wrap: wrap;
  }
  .water-tracker__drop {
    padding: var(--space-1);
    border-radius: var(--radius-md);
    transition: transform var(--duration-fast) var(--ease-spring);
    cursor: pointer;
  }
  .water-tracker__drop:hover {
    transform: scale(1.15);
  }
  .water-tracker__drop:active {
    transform: scale(0.9);
  }
  .water-tracker__drop.filled svg {
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.4));
  }
`;
