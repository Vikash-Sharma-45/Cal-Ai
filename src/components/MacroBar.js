// ============================================
// CAL AI — MACRO BAR
// ============================================

export function createMacroBar(label, current, target, color) {
    const percentage = Math.min((current / target) * 100, 100);
    const over = current > target;

    const bar = document.createElement('div');
    bar.className = 'macro-bar anim-fade-up';
    bar.innerHTML = `
    <div class="macro-bar__header">
      <span class="macro-bar__label">${label}</span>
      <span class="macro-bar__values">
        <span class="macro-bar__current" style="color:${over ? 'var(--accent-red)' : color}">${Math.round(current)}g</span>
        <span class="macro-bar__separator">/</span>
        <span class="macro-bar__target">${target}g</span>
      </span>
    </div>
    <div class="macro-bar__track">
      <div class="macro-bar__fill" style="--bar-color:${color};--bar-target:${percentage}%;width:0%"></div>
    </div>
  `;

    // Animate bar width
    requestAnimationFrame(() => {
        setTimeout(() => {
            const fill = bar.querySelector('.macro-bar__fill');
            if (fill) {
                fill.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                fill.style.width = percentage + '%';
            }
        }, 200);
    });

    return bar;
}

export const macroBarStyles = `
  .macro-bar {
    margin-bottom: var(--space-3);
  }
  .macro-bar__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-1);
  }
  .macro-bar__label {
    font-size: var(--font-sm);
    font-weight: 600;
    color: var(--text-secondary);
  }
  .macro-bar__values {
    font-size: var(--font-sm);
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .macro-bar__current {
    font-weight: 700;
  }
  .macro-bar__separator {
    color: var(--text-muted);
  }
  .macro-bar__target {
    color: var(--text-muted);
  }
  .macro-bar__track {
    height: 8px;
    background: var(--bg-elevated);
    border-radius: var(--radius-full);
    overflow: hidden;
  }
  .macro-bar__fill {
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--bar-color, var(--accent-primary));
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 8px color-mix(in srgb, var(--bar-color, var(--accent-primary)) 40%, transparent);
  }
`;
