// ============================================
// CAL AI — LOCALSTORAGE STORE
// ============================================

const STORE_KEY = 'calai_data';

const defaultState = {
    // Onboarding
    onboardingComplete: false,

    // Profile
    profile: {
        name: '',
        age: 25,
        sex: 'male',
        height: 170,     // cm
        weight: 75,       // kg
        activityLevel: 'moderate',  // sedentary, light, moderate, active, veryActive
        goal: 'maintain', // lose, gain, maintain
        targetWeight: 75,
    },

    // Daily targets (auto-calculated or manually set)
    targets: {
        calories: 2200,
        protein: 150,
        carbs: 250,
        fat: 73,
        water: 8, // glasses
    },

    // Food log: { [dateStr]: [ { id, foodId, name, emoji, serving, calories, protein, carbs, fat, meal, timestamp } ] }
    foodLog: {},

    // Water log: { [dateStr]: count }
    waterLog: {},

    // Weight history: [ { date, weight } ]
    weightHistory: [],

    // Streak
    streak: 0,
    lastLogDate: null,
};

// ── Load / Save ──
function loadStore() {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
            return { ...defaultState, ...JSON.parse(raw) };
        }
    } catch (e) {
        console.warn('Store load error:', e);
    }
    return { ...defaultState };
}

function saveStore(state) {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Store save error:', e);
    }
}

// ── Reactive store ──
let state = loadStore();
const listeners = new Set();

export function getState() {
    return state;
}

export function setState(updater) {
    if (typeof updater === 'function') {
        state = { ...state, ...updater(state) };
    } else {
        state = { ...state, ...updater };
    }
    saveStore(state);
    listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

// ── Helpers ──
export function getTodayStr() {
    return new Date().toISOString().slice(0, 10);
}

export function getTodayLog() {
    const today = getTodayStr();
    return state.foodLog[today] || [];
}

export function addFoodEntry(entry) {
    const today = getTodayStr();
    const log = { ...state.foodLog };
    if (!log[today]) log[today] = [];
    log[today] = [...log[today], {
        ...entry,
        id: Date.now() + Math.random(),
        timestamp: Date.now(),
    }];

    // Update streak
    let streak = state.streak;
    const lastLog = state.lastLogDate;
    if (lastLog !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        streak = lastLog === yesterdayStr ? streak + 1 : 1;
    }

    setState({ foodLog: log, streak, lastLogDate: today });
}

export function removeFoodEntry(entryId) {
    const today = getTodayStr();
    const log = { ...state.foodLog };
    if (log[today]) {
        log[today] = log[today].filter(e => e.id !== entryId);
        setState({ foodLog: log });
    }
}

export function getTodayTotals() {
    const entries = getTodayLog();
    return entries.reduce((acc, e) => ({
        calories: acc.calories + (e.calories || 0),
        protein: acc.protein + (e.protein || 0),
        carbs: acc.carbs + (e.carbs || 0),
        fat: acc.fat + (e.fat || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

export function getWaterToday() {
    const today = getTodayStr();
    return state.waterLog[today] || 0;
}

export function addWater() {
    const today = getTodayStr();
    const waterLog = { ...state.waterLog };
    waterLog[today] = (waterLog[today] || 0) + 1;
    setState({ waterLog });
}

export function removeWater() {
    const today = getTodayStr();
    const waterLog = { ...state.waterLog };
    if (waterLog[today] && waterLog[today] > 0) {
        waterLog[today] = waterLog[today] - 1;
        setState({ waterLog });
    }
}

export function addWeightEntry(weight) {
    const today = getTodayStr();
    const history = [...state.weightHistory];
    const existing = history.findIndex(h => h.date === today);
    if (existing >= 0) {
        history[existing] = { date: today, weight };
    } else {
        history.push({ date: today, weight });
    }
    setState({ weightHistory: history });
}

export function calculateTargets(profile) {
    // Mifflin-St Jeor equation
    let bmr;
    if (profile.sex === 'male') {
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
    };

    let tdee = bmr * (activityMultipliers[profile.activityLevel] || 1.55);

    // Adjust for goal
    if (profile.goal === 'lose') tdee -= 500;
    if (profile.goal === 'gain') tdee += 300;

    const calories = Math.round(tdee);
    const protein = Math.round(profile.weight * 2);     // 2g per kg
    const fat = Math.round((calories * 0.25) / 9);       // 25% calories from fat
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

    return { calories, protein, carbs, fat, water: 8 };
}

// ── Get past N days of totals ──
export function getPastDaysTotals(n = 7) {
    const days = [];
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        const entries = state.foodLog[dateStr] || [];
        const totals = entries.reduce((acc, e) => ({
            calories: acc.calories + (e.calories || 0),
            protein: acc.protein + (e.protein || 0),
            carbs: acc.carbs + (e.carbs || 0),
            fat: acc.fat + (e.fat || 0),
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
        days.push({ date: dateStr, label: d.toLocaleDateString('en-US', { weekday: 'short' }), ...totals });
    }
    return days;
}

export function resetStore() {
    state = { ...defaultState };
    saveStore(state);
    listeners.forEach(fn => fn(state));
}
