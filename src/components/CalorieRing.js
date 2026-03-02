// ============================================
// CAL AI — CALORIE RING (SVG Circular Progress)
// ============================================

export function createCalorieRing(consumed, target) {
    const size = 200;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const remaining = Math.max(0, target - consumed);
    const progress = Math.min(consumed / target, 1);
    const dashOffset = circumference * (1 - progress);
    const overBudget = consumed > target;

    const wrapper = document.createElement('div');
    wrapper.className = 'calorie-ring-wrapper';
    wrapper.innerHTML = `
    <div class="calorie-ring" style="width:${size}px;height:${size}px;">
      <svg viewBox="0 0 ${size} ${size}" class="calorie-ring__svg">
        <circle
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none"
          stroke="var(--bg-elevated)"
          stroke-width="${strokeWidth}"
        />
        <circle
          class="calorie-ring__progress"
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none"
          stroke="${overBudget ? 'var(--accent-red)' : 'url(#ringGradient)'}"
          stroke-width="${strokeWidth}"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
          transform="rotate(-90 ${size / 2} ${size / 2})"
          style="--ring-circumference:${circumference};--ring-target:${dashOffset};"
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--accent-primary)" />
            <stop offset="100%" stop-color="var(--accent-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <div class="calorie-ring__center">
        <span class="calorie-ring__number" data-target="${remaining}">${remaining}</span>
        <span class="calorie-ring__label">${overBudget ? 'over budget' : 'remaining'}</span>
      </div>
    </div>
    <div class="calorie-ring__meta">
      <div class="calorie-ring__stat">
        <span class="calorie-ring__stat-value">${consumed}</span>
        <span class="calorie-ring__stat-label">consumed</span>
      </div>
      <div class="calorie-ring__divider"></div>
      <div class="calorie-ring__stat">
        <span class="calorie-ring__stat-value">${target}</span>
        <span class="calorie-ring__stat-label">goal</span>
      </div>
    </div>
  `;

    // Animate ring fill
    requestAnimationFrame(() => {
        setTimeout(() => {
            const circle = wrapper.querySelector('.calorie-ring__progress');
            if (circle) {
                circle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                circle.style.strokeDashoffset = dashOffset;
            }
            // Count-up animation
            animateNumber(wrapper.querySelector('.calorie-ring__number'), 0, remaining, 1000);
        }, 100);
    });

    return wrapper;
}

function animateNumber(el, start, end, duration) {
    if (!el) return;
    const startTime = performance.now();
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ── Styles ──
export const calorieRingStyles = `
  .calorie-ring-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
  }
  .calorie-ring {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .calorie-ring__svg {
    position: absolute;
    inset: 0;
    filter: drop-shadow(0 0 8px rgba(163, 230, 53, 0.15));
  }
  .calorie-ring__center {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  .calorie-ring__number {
    font-size: var(--font-4xl);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .calorie-ring__label {
    font-size: var(--font-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: var(--space-1);
  }
  .calorie-ring__meta {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }
  .calorie-ring__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .calorie-ring__stat-value {
    font-size: var(--font-lg);
    font-weight: 700;
  }
  .calorie-ring__stat-label {
    font-size: var(--font-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .calorie-ring__divider {
    width: 1px;
    height: 28px;
    background: var(--border-medium);
  }
`;
