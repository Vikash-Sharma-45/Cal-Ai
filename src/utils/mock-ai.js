// ============================================
// CAL AI — MOCK AI FUNCTIONS
// ============================================

import { FOODS } from '../data/foods.js';

// Simulate AI food detection from a photo
export function scanFood(imageFile) {
    return new Promise((resolve) => {
        // Random delay 1.5–3s to simulate processing
        const delay = 1500 + Math.random() * 1500;

        setTimeout(() => {
            // Pick 1–3 random foods as "detected"
            const count = 1 + Math.floor(Math.random() * 3);
            const shuffled = [...FOODS].sort(() => Math.random() - 0.5);
            const detected = shuffled.slice(0, count).map(food => ({
                ...food,
                confidence: (0.82 + Math.random() * 0.17).toFixed(2), // 82-99%
                servings: 1,
            }));

            resolve({
                success: true,
                items: detected,
                processingTime: (delay / 1000).toFixed(1) + 's',
            });
        }, delay);
    });
}

// Simulate barcode scan
export function scanBarcode(barcode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const food = FOODS.find(f => f.barcode === barcode);
            if (food) {
                resolve({ success: true, item: { ...food, servings: 1 } });
            } else {
                // Return a generic item
                resolve({
                    success: true,
                    item: {
                        id: 999,
                        name: 'Scanned Product',
                        category: 'Snacks',
                        serving: '1 serving',
                        calories: 180 + Math.floor(Math.random() * 120),
                        protein: 5 + Math.floor(Math.random() * 15),
                        carbs: 20 + Math.floor(Math.random() * 20),
                        fat: 5 + Math.floor(Math.random() * 10),
                        emoji: '📦',
                        barcode,
                        servings: 1,
                    }
                });
            }
        }, 800);
    });
}

// Generate a mock meal plan
export function generateMealPlan(profile) {
    return new Promise((resolve) => {
        const delay = 1500 + Math.random() * 1000;

        const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        const meals = {
            Breakfast: [
                { name: 'Oatmeal with Blueberries', emoji: '🥣', calories: 280, protein: 8, carbs: 48, fat: 6 },
                { name: 'Egg White Omelette', emoji: '🥚', calories: 220, protein: 26, carbs: 4, fat: 10 },
                { name: 'Greek Yogurt Parfait', emoji: '🥛', calories: 310, protein: 24, carbs: 38, fat: 8 },
                { name: 'Avocado Toast with Eggs', emoji: '🥑', calories: 380, protein: 18, carbs: 32, fat: 22 },
                { name: 'Protein Smoothie Bowl', emoji: '🥤', calories: 340, protein: 28, carbs: 42, fat: 6 },
            ],
            Lunch: [
                { name: 'Grilled Chicken Salad', emoji: '🥗', calories: 420, protein: 38, carbs: 18, fat: 22 },
                { name: 'Turkey & Avocado Wrap', emoji: '🌯', calories: 480, protein: 32, carbs: 44, fat: 18 },
                { name: 'Quinoa Buddha Bowl', emoji: '🥙', calories: 450, protein: 18, carbs: 52, fat: 16 },
                { name: 'Salmon Poke Bowl', emoji: '🐟', calories: 510, protein: 34, carbs: 48, fat: 18 },
                { name: 'Chicken Stir Fry', emoji: '🍗', calories: 440, protein: 36, carbs: 38, fat: 14 },
            ],
            Dinner: [
                { name: 'Grilled Salmon & Veggies', emoji: '🐟', calories: 520, protein: 42, carbs: 22, fat: 28 },
                { name: 'Lean Steak with Sweet Potato', emoji: '🥩', calories: 580, protein: 48, carbs: 40, fat: 20 },
                { name: 'Chicken Breast & Brown Rice', emoji: '🍗', calories: 490, protein: 44, carbs: 46, fat: 10 },
                { name: 'Shrimp Tacos', emoji: '🌮', calories: 410, protein: 28, carbs: 38, fat: 16 },
                { name: 'Turkey Meatballs & Pasta', emoji: '🍝', calories: 520, protein: 36, carbs: 52, fat: 14 },
            ],
            Snack: [
                { name: 'Almonds & Dark Chocolate', emoji: '🥜', calories: 210, protein: 6, carbs: 14, fat: 16 },
                { name: 'Apple with Peanut Butter', emoji: '🍎', calories: 270, protein: 8, carbs: 32, fat: 16 },
                { name: 'Protein Bar', emoji: '🍫', calories: 200, protein: 20, carbs: 22, fat: 7 },
                { name: 'Cottage Cheese & Fruits', emoji: '🧀', calories: 180, protein: 16, carbs: 18, fat: 4 },
                { name: 'Trail Mix', emoji: '🥜', calories: 175, protein: 5, carbs: 16, fat: 11 },
            ],
        };

        setTimeout(() => {
            const plan = mealTypes.map(type => {
                const options = meals[type];
                const pick = options[Math.floor(Math.random() * options.length)];
                return { meal: type, ...pick };
            });

            resolve({
                success: true,
                plan,
                totalCalories: plan.reduce((s, m) => s + m.calories, 0),
                totalProtein: plan.reduce((s, m) => s + m.protein, 0),
                totalCarbs: plan.reduce((s, m) => s + m.carbs, 0),
                totalFat: plan.reduce((s, m) => s + m.fat, 0),
            });
        }, delay);
    });
}
