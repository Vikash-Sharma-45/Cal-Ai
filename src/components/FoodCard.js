// ============================================
// CAL AI — FOOD CARD
// ============================================

export function createFoodCard(food, options = {}) {
    const { onAdd, onRemove, showMacros = true, animDelay = 0 } = options;

    const card = document.createElement('div');
    card.className = 'food-card card anim-fade-up';
    if (animDelay) card.style.animationDelay = `${animDelay}ms`;

    card.innerHTML = `
    <div class="food-card__main">
      <span class="food-card__emoji">${food.emoji || '🍽️'}</span>
      <div class="food-card__info">
        <span class="food-card__name">${food.name}</span>
        <span class="food-card__serving">${food.serving}</span>
      </div>
      <div class="food-card__calories">
        <span class="food-card__cal-number">${food.calories}</span>
        <span class="food-card__cal-label">cal</span>
      </div>
      ${onAdd ? '<button class="food-card__add btn btn-primary" id="add-food-' + (food.id || '') + '">+</button>' : ''}
      ${onRemove ? '<button class="food-card__remove" id="remove-food-' + food.id + '">✕</button>' : ''}
    </div>
    ${showMacros ? `
    <div class="food-card__macros">
      <span class="food-card__macro"><span style="color:var(--accent-secondary)">P</span> ${food.protein}g</span>
      <span class="food-card__macro"><span style="color:var(--accent-blue)">C</span> ${food.carbs}g</span>
      <span class="food-card__macro"><span style="color:var(--accent-orange)">F</span> ${food.fat}g</span>
    </div>
    ` : ''}
  `;

    if (onAdd) {
        card.querySelector('.food-card__add').addEventListener('click', (e) => {
            e.stopPropagation();
            onAdd(food);
        });
    }

    if (onRemove) {
        card.querySelector('.food-card__remove').addEventListener('click', (e) => {
            e.stopPropagation();
            card.style.transition = 'all 0.3s var(--ease-out)';
            card.style.transform = 'translateX(-100%)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.height = card.offsetHeight + 'px';
                requestAnimationFrame(() => {
                    card.style.height = '0';
                    card.style.padding = '0';
                    card.style.margin = '0';
                    card.style.overflow = 'hidden';
                    setTimeout(() => {
                        onRemove(food);
                        card.remove();
                    }, 300);
                });
            }, 250);
        });
    }

    return card;
}

export const foodCardStyles = `
  .food-card {
    padding: var(--space-3) var(--space-4);
  }
  .food-card__main {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .food-card__emoji {
    font-size: 1.75rem;
    width: 40px;
    text-align: center;
    flex-shrink: 0;
  }
  .food-card__info {
    flex: 1;
    min-width: 0;
  }
  .food-card__name {
    font-size: var(--font-sm);
    font-weight: 600;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .food-card__serving {
    font-size: var(--font-xs);
    color: var(--text-muted);
    display: block;
  }
  .food-card__calories {
    text-align: right;
    flex-shrink: 0;
  }
  .food-card__cal-number {
    font-size: var(--font-lg);
    font-weight: 700;
    display: block;
    line-height: 1.2;
  }
  .food-card__cal-label {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }
  .food-card__add {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: var(--radius-full);
    font-size: 1.2rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .food-card__remove {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    color: var(--text-muted);
    font-size: 0.75rem;
    flex-shrink: 0;
    transition: all var(--duration-fast) var(--ease-out);
  }
  .food-card__remove:hover {
    background: rgba(239, 68, 68, 0.15);
    color: var(--accent-red);
  }
  .food-card__macros {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-2);
    padding-top: var(--space-2);
    border-top: 1px solid var(--border-subtle);
  }
  .food-card__macro {
    font-size: var(--font-xs);
    color: var(--text-secondary);
  }
`;
