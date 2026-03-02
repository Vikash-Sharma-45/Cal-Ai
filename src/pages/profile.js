// ============================================
// CAL AI — PROFILE PAGE
// ============================================

import { getState, setState, calculateTargets, addWeightEntry, resetStore } from '../utils/store.js';
import { showToast } from '../components/Toast.js';
import { navigate } from '../utils/router.js';

export function renderProfile() {
    const state = getState();
    const profile = state.profile;
    const targets = state.targets;

    const page = document.createElement('div');
    page.className = 'page profile-page';

    page.innerHTML = `
    <div class="page-header anim-fade-up">
      <h1 class="page-title">Profile</h1>
    </div>

    <!-- Avatar -->
    <div class="profile-avatar-section anim-fade-up stagger-1">
      <div class="profile-avatar">👤</div>
      <h2 class="profile-name">${profile.name || 'User'}</h2>
      <span class="profile-goal chip active">${profile.goal === 'lose' ? '📉 Lose Weight' : profile.goal === 'gain' ? '📈 Gain Weight' : '⚖️ Maintain'}</span>
    </div>

    <!-- Stats -->
    <div class="section card anim-fade-up stagger-2">
      <div class="section-title">Body Stats</div>
      <div class="profile-stats">
        <div class="profile-stat"><span class="profile-stat__val">${profile.age}</span><span class="profile-stat__lbl">Age</span></div>
        <div class="profile-stat"><span class="profile-stat__val">${profile.height}</span><span class="profile-stat__lbl">cm</span></div>
        <div class="profile-stat"><span class="profile-stat__val">${profile.weight}</span><span class="profile-stat__lbl">kg</span></div>
        <div class="profile-stat"><span class="profile-stat__val">${profile.targetWeight}</span><span class="profile-stat__lbl">Target kg</span></div>
      </div>
    </div>

    <!-- Daily Targets -->
    <div class="section card anim-fade-up stagger-3">
      <div class="section-title">Daily Targets</div>
      <div class="profile-targets">
        <div class="profile-target-row">
          <span>Calories</span>
          <div class="profile-target-input-wrap">
            <input type="number" class="input-field profile-target-input" value="${targets.calories}" id="target-cal" />
            <span class="metric-unit">cal</span>
          </div>
        </div>
        <div class="profile-target-row">
          <span>Protein</span>
          <div class="profile-target-input-wrap">
            <input type="number" class="input-field profile-target-input" value="${targets.protein}" id="target-protein" />
            <span class="metric-unit">g</span>
          </div>
        </div>
        <div class="profile-target-row">
          <span>Carbs</span>
          <div class="profile-target-input-wrap">
            <input type="number" class="input-field profile-target-input" value="${targets.carbs}" id="target-carbs" />
            <span class="metric-unit">g</span>
          </div>
        </div>
        <div class="profile-target-row">
          <span>Fat</span>
          <div class="profile-target-input-wrap">
            <input type="number" class="input-field profile-target-input" value="${targets.fat}" id="target-fat" />
            <span class="metric-unit">g</span>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" id="save-targets" style="margin-top:var(--space-4)">Save Targets</button>
    </div>

    <!-- Log Weight -->
    <div class="section card anim-fade-up stagger-4">
      <div class="section-title">Log Today's Weight</div>
      <div class="profile-target-row">
        <input type="number" class="input-field" placeholder="Weight in kg" id="log-weight-input" style="flex:1" />
        <button class="btn btn-secondary" id="log-weight-btn">Log</button>
      </div>
    </div>

    <!-- Actions -->
    <div class="section anim-fade-up stagger-5">
      <button class="btn btn-secondary btn-block" id="recalculate-btn" style="margin-bottom:var(--space-2)">🔄 Recalculate Targets</button>
      <button class="btn btn-ghost btn-block profile-danger-btn" id="reset-btn">Reset All Data</button>
    </div>
  `;

    // Save targets
    page.querySelector('#save-targets').addEventListener('click', () => {
        const newTargets = {
            calories: parseInt(page.querySelector('#target-cal').value) || targets.calories,
            protein: parseInt(page.querySelector('#target-protein').value) || targets.protein,
            carbs: parseInt(page.querySelector('#target-carbs').value) || targets.carbs,
            fat: parseInt(page.querySelector('#target-fat').value) || targets.fat,
            water: targets.water,
        };
        setState({ targets: newTargets });
        showToast('Targets updated!');
    });

    // Log weight
    page.querySelector('#log-weight-btn').addEventListener('click', () => {
        const val = parseFloat(page.querySelector('#log-weight-input').value);
        if (val && val > 0) {
            addWeightEntry(val);
            setState(s => ({ profile: { ...s.profile, weight: val } }));
            showToast(`Weight logged: ${val}kg`);
            page.querySelector('#log-weight-input').value = '';
        }
    });

    // Recalculate
    page.querySelector('#recalculate-btn').addEventListener('click', () => {
        const newTargets = calculateTargets(getState().profile);
        setState({ targets: newTargets });
        showToast('Targets recalculated!');
        page.querySelector('#target-cal').value = newTargets.calories;
        page.querySelector('#target-protein').value = newTargets.protein;
        page.querySelector('#target-carbs').value = newTargets.carbs;
        page.querySelector('#target-fat').value = newTargets.fat;
    });

    // Reset
    page.querySelector('#reset-btn').addEventListener('click', () => {
        if (confirm('Are you sure? This will delete all your data.')) {
            resetStore();
            navigate('/onboarding');
            showToast('All data reset', 'info');
        }
    });

    return page;
}

export const profileStyles = `
  .profile-avatar-section { text-align:center; margin-bottom:var(--space-6); }
  .profile-avatar { font-size:4rem; width:80px; height:80px; display:flex; align-items:center; justify-content:center; background:var(--bg-card); border-radius:var(--radius-full); margin:0 auto var(--space-3); border:2px solid var(--border-medium); }
  .profile-name { font-size:var(--font-xl); font-weight:700; margin-bottom:var(--space-2); }
  .profile-stats { display:flex; justify-content:space-between; }
  .profile-stat { display:flex; flex-direction:column; align-items:center; }
  .profile-stat__val { font-size:var(--font-lg); font-weight:700; }
  .profile-stat__lbl { font-size:var(--font-xs); color:var(--text-muted); }
  .profile-targets { display:flex; flex-direction:column; gap:var(--space-3); }
  .profile-target-row { display:flex; align-items:center; justify-content:space-between; gap:var(--space-3); font-size:var(--font-sm); }
  .profile-target-input-wrap { display:flex; align-items:center; gap:var(--space-1); }
  .profile-target-input { width:80px; text-align:center; padding:var(--space-2); }
  .profile-danger-btn { color:var(--accent-red)!important; }
  .profile-danger-btn:hover { background:rgba(239,68,68,0.1)!important; }
`;
