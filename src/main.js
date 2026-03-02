// ============================================
// CAL AI — MAIN ENTRY POINT
// ============================================

import './styles/index.css';
import './styles/animations.css';

import { getState } from './utils/store.js';
import { registerRoute, initRouter, navigate, getCurrentRoute } from './utils/router.js';
import { createNavBar, updateNavBar, navBarStyles } from './components/NavBar.js';
import { calorieRingStyles } from './components/CalorieRing.js';
import { macroBarStyles } from './components/MacroBar.js';
import { toastStyles } from './components/Toast.js';
import { waterTrackerStyles } from './components/WaterTracker.js';
import { foodCardStyles } from './components/FoodCard.js';

import { renderOnboarding, onboardingStyles } from './pages/onboarding.js';
import { renderDashboard, dashboardStyles } from './pages/dashboard.js';
import { renderLogMeal, logMealStyles } from './pages/log-meal.js';
import { renderFoodSearch, foodSearchStyles } from './pages/food-search.js';
import { renderProgress, progressStyles } from './pages/progress.js';
import { renderMealPlan, mealPlanStyles } from './pages/meal-plan.js';
import { renderProfile, profileStyles } from './pages/profile.js';

// ── Inject Component + Page Styles ──
const allStyles = [
    navBarStyles,
    calorieRingStyles,
    macroBarStyles,
    toastStyles,
    waterTrackerStyles,
    foodCardStyles,
    onboardingStyles,
    dashboardStyles,
    logMealStyles,
    foodSearchStyles,
    progressStyles,
    mealPlanStyles,
    profileStyles,
].join('\n');

const styleEl = document.createElement('style');
styleEl.textContent = allStyles;
document.head.appendChild(styleEl);

// ── App Container ──
const app = document.getElementById('app');

// Pages that show the bottom nav
const NAV_PAGES = ['/dashboard', '/search', '/log', '/progress', '/profile', '/meal-plan'];

function renderWithNav(renderFn) {
    return () => {
        const pageEl = renderFn();
        const wrapper = document.createElement('div');
        wrapper.appendChild(pageEl);
        wrapper.appendChild(createNavBar());
        return wrapper;
    };
}

// ── Register Routes ──
registerRoute('/onboarding', renderOnboarding);
registerRoute('/dashboard', renderWithNav(renderDashboard));
registerRoute('/search', renderWithNav(renderFoodSearch));
registerRoute('/log', renderWithNav(renderLogMeal));
registerRoute('/progress', renderWithNav(renderProgress));
registerRoute('/profile', renderWithNav(renderProfile));
registerRoute('/meal-plan', renderWithNav(renderMealPlan));

// Default route logic
registerRoute('/', () => {
    const state = getState();
    if (!state.onboardingComplete) {
        navigate('/onboarding');
        return document.createElement('div');
    } else {
        navigate('/dashboard');
        return document.createElement('div');
    }
});

// ── Initialize ──
initRouter(app);

// Update nav indicator on route change
window.addEventListener('hashchange', () => {
    setTimeout(updateNavBar, 50);
});
