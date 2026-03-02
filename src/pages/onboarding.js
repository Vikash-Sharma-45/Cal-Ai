// ============================================
// CAL AI — ONBOARDING PAGE
// ============================================

import { getState, setState, calculateTargets } from '../utils/store.js';
import { navigate } from '../utils/router.js';

const STEPS = [
    { id: 'welcome', title: 'Welcome' },
    { id: 'goal', title: 'Your Goal' },
    { id: 'metrics', title: 'About You' },
    { id: 'activity', title: 'Activity' },
    { id: 'preview', title: 'Your Plan' },
    { id: 'ready', title: 'Ready!' },
];

let currentStep = 0;
let formData = {
    goal: 'lose',
    sex: 'male',
    age: 25,
    height: 170,
    weight: 75,
    targetWeight: 70,
    activityLevel: 'moderate',
};

export function renderOnboarding() {
    currentStep = 0;
    const state = getState();
    if (state.onboardingComplete) {
        navigate('/dashboard');
        return document.createElement('div');
    }

    const page = document.createElement('div');
    page.className = 'page onboarding-page';
    page.innerHTML = `
    <div class="onboarding-progress">
      <div class="onboarding-progress__bar" style="width:${((currentStep + 1) / STEPS.length) * 100}%"></div>
    </div>
    <div class="onboarding-step-container" id="onboarding-step"></div>
  `;

    renderStep(page);
    return page;
}

function renderStep(page) {
    const container = page.querySelector('#onboarding-step');
    if (!container) return;

    const progressBar = page.querySelector('.onboarding-progress__bar');
    if (progressBar) {
        progressBar.style.width = `${((currentStep + 1) / STEPS.length) * 100}%`;
    }

    container.innerHTML = '';
    container.className = 'onboarding-step-container anim-slide-right';

    // Force re-trigger animation
    void container.offsetWidth;
    container.className = 'onboarding-step-container anim-slide-right';

    const step = STEPS[currentStep];

    switch (step.id) {
        case 'welcome':
            container.innerHTML = `
        <div class="onboarding-step">
          <div class="onboarding-logo anim-scale-bounce">🔥</div>
          <h1 class="onboarding-title anim-fade-up">Cal AI</h1>
          <p class="onboarding-subtitle anim-fade-up stagger-2">AI-powered calorie tracking.<br/>Snap. Track. Achieve.</p>
          <div class="onboarding-features anim-fade-up stagger-4">
            <div class="onboarding-feature">📸 <span>AI photo scanning</span></div>
            <div class="onboarding-feature">📊 <span>Smart insights</span></div>
            <div class="onboarding-feature">🎯 <span>Personalized goals</span></div>
          </div>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-6" id="onboarding-next">Get Started</button>
        </div>
      `;
            break;

        case 'goal':
            container.innerHTML = `
        <div class="onboarding-step">
          <h2 class="onboarding-step-title anim-fade-up">What's your goal?</h2>
          <p class="onboarding-step-desc anim-fade-up stagger-1">We'll personalize everything for you</p>
          <div class="goal-options anim-fade-up stagger-2">
            ${['lose', 'maintain', 'gain'].map(g => `
              <button class="goal-option card ${formData.goal === g ? 'active' : ''}" data-goal="${g}">
                <span class="goal-option__icon">${g === 'lose' ? '📉' : g === 'maintain' ? '⚖️' : '📈'}</span>
                <span class="goal-option__label">${g === 'lose' ? 'Lose Weight' : g === 'maintain' ? 'Maintain' : 'Gain Weight'}</span>
              </button>
            `).join('')}
          </div>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-4" id="onboarding-next">Continue</button>
        </div>
      `;
            container.querySelectorAll('.goal-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    formData.goal = btn.dataset.goal;
                    container.querySelectorAll('.goal-option').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
            break;

        case 'metrics':
            container.innerHTML = `
        <div class="onboarding-step">
          <h2 class="onboarding-step-title anim-fade-up">Tell us about yourself</h2>
          <p class="onboarding-step-desc anim-fade-up stagger-1">This helps us calculate your targets</p>
          <div class="metrics-form anim-fade-up stagger-2">
            <div class="metrics-row">
              <label>Sex</label>
              <div class="toggle-group">
                <button class="toggle-btn ${formData.sex === 'male' ? 'active' : ''}" data-sex="male">Male</button>
                <button class="toggle-btn ${formData.sex === 'female' ? 'active' : ''}" data-sex="female">Female</button>
              </div>
            </div>
            <div class="metrics-row">
              <label>Age</label>
              <div class="metric-input-wrap">
                <input type="number" class="input-field metric-input" value="${formData.age}" id="input-age" min="10" max="100"/>
                <span class="metric-unit">years</span>
              </div>
            </div>
            <div class="metrics-row">
              <label>Height</label>
              <div class="metric-input-wrap">
                <input type="number" class="input-field metric-input" value="${formData.height}" id="input-height" min="100" max="250"/>
                <span class="metric-unit">cm</span>
              </div>
            </div>
            <div class="metrics-row">
              <label>Current Weight</label>
              <div class="metric-input-wrap">
                <input type="number" class="input-field metric-input" value="${formData.weight}" id="input-weight" min="30" max="300"/>
                <span class="metric-unit">kg</span>
              </div>
            </div>
            <div class="metrics-row">
              <label>Target Weight</label>
              <div class="metric-input-wrap">
                <input type="number" class="input-field metric-input" value="${formData.targetWeight}" id="input-target-weight" min="30" max="300"/>
                <span class="metric-unit">kg</span>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-4" id="onboarding-next">Continue</button>
        </div>
      `;
            // Sex toggle
            container.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    formData.sex = btn.dataset.sex;
                    container.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
            // Input listeners
            ['age', 'height', 'weight', 'target-weight'].forEach(field => {
                const input = container.querySelector(`#input-${field}`);
                if (input) {
                    input.addEventListener('change', () => {
                        const key = field === 'target-weight' ? 'targetWeight' : field;
                        formData[key] = parseFloat(input.value) || formData[key];
                    });
                }
            });
            break;

        case 'activity':
            const levels = [
                { key: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', icon: '🪑' },
                { key: 'light', label: 'Lightly Active', desc: '1-3 days/week', icon: '🚶' },
                { key: 'moderate', label: 'Moderately Active', desc: '3-5 days/week', icon: '🏃' },
                { key: 'active', label: 'Very Active', desc: '6-7 days/week', icon: '💪' },
                { key: 'veryActive', label: 'Athlete', desc: 'Intense training', icon: '🏆' },
            ];
            container.innerHTML = `
        <div class="onboarding-step">
          <h2 class="onboarding-step-title anim-fade-up">Activity Level</h2>
          <p class="onboarding-step-desc anim-fade-up stagger-1">How active are you typically?</p>
          <div class="activity-options anim-fade-up stagger-2">
            ${levels.map(l => `
              <button class="activity-option card ${formData.activityLevel === l.key ? 'active' : ''}" data-level="${l.key}">
                <span class="activity-option__icon">${l.icon}</span>
                <div class="activity-option__text">
                  <span class="activity-option__label">${l.label}</span>
                  <span class="activity-option__desc">${l.desc}</span>
                </div>
              </button>
            `).join('')}
          </div>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-4" id="onboarding-next">Continue</button>
        </div>
      `;
            container.querySelectorAll('.activity-option').forEach(btn => {
                btn.addEventListener('click', () => {
                    formData.activityLevel = btn.dataset.level;
                    container.querySelectorAll('.activity-option').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
            break;

        case 'preview':
            const targets = calculateTargets(formData);
            container.innerHTML = `
        <div class="onboarding-step">
          <div class="preview-badge anim-scale-bounce">✅</div>
          <h2 class="onboarding-step-title anim-fade-up">Your goal is realistic!</h2>
          <p class="onboarding-step-desc anim-fade-up stagger-1">Here's your personalized daily plan</p>
          <div class="preview-targets anim-fade-up stagger-3">
            <div class="preview-target preview-target--main">
              <span class="preview-target__value gradient-text" id="preview-cal">0</span>
              <span class="preview-target__label">Daily Calories</span>
            </div>
            <div class="preview-target-row">
              <div class="preview-target">
                <span class="preview-target__value" style="color:var(--accent-secondary)" id="preview-protein">0</span>
                <span class="preview-target__label">Protein (g)</span>
              </div>
              <div class="preview-target">
                <span class="preview-target__value" style="color:var(--accent-blue)" id="preview-carbs">0</span>
                <span class="preview-target__label">Carbs (g)</span>
              </div>
              <div class="preview-target">
                <span class="preview-target__value" style="color:var(--accent-orange)" id="preview-fat">0</span>
                <span class="preview-target__label">Fat (g)</span>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-5" id="onboarding-next">Let's Go!</button>
        </div>
      `;
            // Count-up animation for targets
            setTimeout(() => {
                animateNum(container.querySelector('#preview-cal'), targets.calories, 1200);
                animateNum(container.querySelector('#preview-protein'), targets.protein, 800);
                animateNum(container.querySelector('#preview-carbs'), targets.carbs, 800);
                animateNum(container.querySelector('#preview-fat'), targets.fat, 800);
            }, 400);
            break;

        case 'ready':
            const finalTargets = calculateTargets(formData);
            setState({
                onboardingComplete: true,
                profile: { ...formData },
                targets: finalTargets,
                weightHistory: [{ date: new Date().toISOString().slice(0, 10), weight: formData.weight }],
            });
            container.innerHTML = `
        <div class="onboarding-step">
          <div class="ready-icon anim-scale-bounce">🚀</div>
          <h2 class="onboarding-step-title anim-fade-up">You're all set!</h2>
          <p class="onboarding-step-desc anim-fade-up stagger-1">Start tracking your first meal</p>
          <button class="btn btn-primary btn-lg btn-block anim-fade-up stagger-3" id="onboarding-finish">Open Dashboard</button>
        </div>
      `;
            container.querySelector('#onboarding-finish')?.addEventListener('click', () => {
                navigate('/dashboard');
            });
            return; // Don't attach "next" listener
    }

    // Next button
    container.querySelector('#onboarding-next')?.addEventListener('click', () => {
        currentStep++;
        renderStep(page);
    });
}

function animateNum(el, target, duration) {
    if (!el) return;
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

export const onboardingStyles = `
  .onboarding-page {
    padding-bottom: var(--space-8) !important;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .onboarding-progress {
    height: 4px;
    background: var(--bg-elevated);
    border-radius: var(--radius-full);
    margin-bottom: var(--space-8);
    overflow: hidden;
  }
  .onboarding-progress__bar {
    height: 100%;
    background: var(--accent-gradient);
    border-radius: var(--radius-full);
    transition: width 0.4s var(--ease-out);
  }
  .onboarding-step-container {
    flex: 1;
    display: flex;
  }
  .onboarding-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--space-4);
  }
  .onboarding-logo {
    font-size: 4rem;
    margin-bottom: var(--space-2);
  }
  .onboarding-title {
    font-size: var(--font-3xl);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .onboarding-subtitle {
    font-size: var(--font-base);
    color: var(--text-secondary);
    line-height: 1.6;
  }
  .onboarding-features {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin: var(--space-4) 0;
  }
  .onboarding-feature {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-base);
    color: var(--text-secondary);
  }
  .onboarding-step-title {
    font-size: var(--font-2xl);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .onboarding-step-desc {
    font-size: var(--font-sm);
    color: var(--text-muted);
    margin-bottom: var(--space-2);
  }

  /* Goal options */
  .goal-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    width: 100%;
    margin: var(--space-4) 0;
  }
  .goal-option {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
    cursor: pointer;
    text-align: left;
    transition: all var(--duration-normal) var(--ease-out);
  }
  .goal-option.active {
    border-color: var(--accent-primary);
    background: rgba(163, 230, 53, 0.06);
    box-shadow: var(--shadow-glow);
  }
  .goal-option__icon {
    font-size: 1.75rem;
  }
  .goal-option__label {
    font-size: var(--font-base);
    font-weight: 600;
  }

  /* Metrics */
  .metrics-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: var(--space-4) 0;
    text-align: left;
  }
  .metrics-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .metrics-row label {
    font-size: var(--font-sm);
    font-weight: 500;
    color: var(--text-secondary);
    white-space: nowrap;
  }
  .toggle-group {
    display: flex;
    gap: var(--space-2);
  }
  .toggle-btn {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--font-sm);
    font-weight: 500;
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    transition: all var(--duration-fast) var(--ease-out);
  }
  .toggle-btn.active {
    background: rgba(163, 230, 53, 0.12);
    color: var(--accent-primary);
    border-color: var(--border-accent);
  }
  .metric-input-wrap {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .metric-input {
    width: 80px;
    text-align: center;
    padding: var(--space-2) var(--space-3);
  }
  .metric-unit {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }

  /* Activity */
  .activity-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
    margin: var(--space-3) 0;
  }
  .activity-option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    cursor: pointer;
    text-align: left;
    transition: all var(--duration-normal) var(--ease-out);
  }
  .activity-option.active {
    border-color: var(--accent-primary);
    background: rgba(163, 230, 53, 0.06);
  }
  .activity-option__icon {
    font-size: 1.5rem;
  }
  .activity-option__text {
    display: flex;
    flex-direction: column;
  }
  .activity-option__label {
    font-size: var(--font-sm);
    font-weight: 600;
  }
  .activity-option__desc {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }

  /* Preview */
  .preview-badge {
    font-size: 3rem;
    margin-bottom: var(--space-2);
  }
  .preview-targets {
    width: 100%;
    margin: var(--space-4) 0;
  }
  .preview-target--main {
    text-align: center;
    margin-bottom: var(--space-5);
  }
  .preview-target--main .preview-target__value {
    font-size: var(--font-4xl);
    font-weight: 800;
    letter-spacing: -0.03em;
  }
  .preview-target-row {
    display: flex;
    justify-content: center;
    gap: var(--space-8);
  }
  .preview-target {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .preview-target__value {
    font-size: var(--font-2xl);
    font-weight: 700;
  }
  .preview-target__label {
    font-size: var(--font-xs);
    color: var(--text-muted);
    margin-top: var(--space-1);
  }

  /* Ready */
  .ready-icon {
    font-size: 4rem;
    margin-bottom: var(--space-2);
  }
`;
