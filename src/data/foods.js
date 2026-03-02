// ============================================
// CAL AI — FOOD DATABASE (~200 items)
// ============================================

export const FOOD_CATEGORIES = [
  'All', 'Fruits', 'Vegetables', 'Proteins', 'Grains', 'Dairy', 'Snacks', 'Beverages', 'Fast Food', 'Desserts'
];

export const FOODS = [
  // ── Fruits ──
  { id: 1, name: 'Apple', category: 'Fruits', serving: '1 medium (182g)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, emoji: '🍎' },
  { id: 2, name: 'Banana', category: 'Fruits', serving: '1 medium (118g)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, emoji: '🍌' },
  { id: 3, name: 'Orange', category: 'Fruits', serving: '1 medium (131g)', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, emoji: '🍊' },
  { id: 4, name: 'Strawberries', category: 'Fruits', serving: '1 cup (152g)', calories: 49, protein: 1, carbs: 12, fat: 0.5, emoji: '🍓' },
  { id: 5, name: 'Blueberries', category: 'Fruits', serving: '1 cup (148g)', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, emoji: '🫐' },
  { id: 6, name: 'Grapes', category: 'Fruits', serving: '1 cup (151g)', calories: 104, protein: 1.1, carbs: 27, fat: 0.2, emoji: '🍇' },
  { id: 7, name: 'Watermelon', category: 'Fruits', serving: '1 cup (154g)', calories: 46, protein: 0.9, carbs: 12, fat: 0.2, emoji: '🍉' },
  { id: 8, name: 'Mango', category: 'Fruits', serving: '1 cup (165g)', calories: 99, protein: 1.4, carbs: 25, fat: 0.6, emoji: '🥭' },
  { id: 9, name: 'Pineapple', category: 'Fruits', serving: '1 cup (165g)', calories: 82, protein: 0.9, carbs: 22, fat: 0.2, emoji: '🍍' },
  { id: 10, name: 'Avocado', category: 'Fruits', serving: '1/2 medium (68g)', calories: 114, protein: 1.3, carbs: 6, fat: 10.5, emoji: '🥑' },
  { id: 11, name: 'Peach', category: 'Fruits', serving: '1 medium (150g)', calories: 59, protein: 1.4, carbs: 14, fat: 0.4, emoji: '🍑' },
  { id: 12, name: 'Pear', category: 'Fruits', serving: '1 medium (178g)', calories: 101, protein: 0.7, carbs: 27, fat: 0.2, emoji: '🍐' },
  { id: 13, name: 'Kiwi', category: 'Fruits', serving: '1 medium (76g)', calories: 42, protein: 0.8, carbs: 10, fat: 0.4, emoji: '🥝' },
  { id: 14, name: 'Cherries', category: 'Fruits', serving: '1 cup (138g)', calories: 87, protein: 1.5, carbs: 22, fat: 0.3, emoji: '🍒' },

  // ── Vegetables ──
  { id: 20, name: 'Broccoli', category: 'Vegetables', serving: '1 cup (91g)', calories: 31, protein: 2.6, carbs: 6, fat: 0.3, emoji: '🥦' },
  { id: 21, name: 'Spinach', category: 'Vegetables', serving: '1 cup (30g)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, emoji: '🥬' },
  { id: 22, name: 'Carrot', category: 'Vegetables', serving: '1 medium (61g)', calories: 25, protein: 0.6, carbs: 6, fat: 0.1, emoji: '🥕' },
  { id: 23, name: 'Sweet Potato', category: 'Vegetables', serving: '1 medium (130g)', calories: 112, protein: 2, carbs: 26, fat: 0.1, emoji: '🍠' },
  { id: 24, name: 'Tomato', category: 'Vegetables', serving: '1 medium (123g)', calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, emoji: '🍅' },
  { id: 25, name: 'Bell Pepper', category: 'Vegetables', serving: '1 medium (119g)', calories: 31, protein: 1, carbs: 6, fat: 0.3, emoji: '🫑' },
  { id: 26, name: 'Cucumber', category: 'Vegetables', serving: '1 cup (104g)', calories: 16, protein: 0.7, carbs: 3.1, fat: 0.2, emoji: '🥒' },
  { id: 27, name: 'Mushrooms', category: 'Vegetables', serving: '1 cup (70g)', calories: 15, protein: 2.2, carbs: 2.3, fat: 0.2, emoji: '🍄' },
  { id: 28, name: 'Corn', category: 'Vegetables', serving: '1 ear (90g)', calories: 77, protein: 2.9, carbs: 17, fat: 1.1, emoji: '🌽' },
  { id: 29, name: 'Green Beans', category: 'Vegetables', serving: '1 cup (125g)', calories: 31, protein: 1.8, carbs: 7, fat: 0.1, emoji: '🫛' },
  { id: 30, name: 'Cauliflower', category: 'Vegetables', serving: '1 cup (107g)', calories: 27, protein: 2.1, carbs: 5.3, fat: 0.3, emoji: '🥦' },
  { id: 31, name: 'Zucchini', category: 'Vegetables', serving: '1 cup (124g)', calories: 21, protein: 1.5, carbs: 3.9, fat: 0.4, emoji: '🥒' },

  // ── Proteins ──
  { id: 40, name: 'Chicken Breast', category: 'Proteins', serving: '4 oz (113g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, emoji: '🍗' },
  { id: 41, name: 'Salmon', category: 'Proteins', serving: '4 oz (113g)', calories: 208, protein: 23, carbs: 0, fat: 12, emoji: '🐟' },
  { id: 42, name: 'Ground Beef (90%)', category: 'Proteins', serving: '4 oz (113g)', calories: 200, protein: 22, carbs: 0, fat: 11, emoji: '🥩' },
  { id: 43, name: 'Turkey Breast', category: 'Proteins', serving: '4 oz (113g)', calories: 120, protein: 26, carbs: 0, fat: 1, emoji: '🦃' },
  { id: 44, name: 'Tuna (canned)', category: 'Proteins', serving: '1 can (142g)', calories: 191, protein: 42, carbs: 0, fat: 1.4, emoji: '🐟' },
  { id: 45, name: 'Shrimp', category: 'Proteins', serving: '4 oz (113g)', calories: 112, protein: 24, carbs: 1, fat: 1.2, emoji: '🦐' },
  { id: 46, name: 'Eggs', category: 'Proteins', serving: '2 large', calories: 143, protein: 12.6, carbs: 0.7, fat: 9.5, emoji: '🥚' },
  { id: 47, name: 'Tofu', category: 'Proteins', serving: '1/2 cup (126g)', calories: 94, protein: 10, carbs: 2.3, fat: 6, emoji: '🧈' },
  { id: 48, name: 'Steak (Sirloin)', category: 'Proteins', serving: '6 oz (170g)', calories: 276, protein: 44, carbs: 0, fat: 10, emoji: '🥩' },
  { id: 49, name: 'Pork Chop', category: 'Proteins', serving: '4 oz (113g)', calories: 187, protein: 30, carbs: 0, fat: 7, emoji: '🥩' },
  { id: 50, name: 'Cod', category: 'Proteins', serving: '4 oz (113g)', calories: 93, protein: 20, carbs: 0, fat: 0.8, emoji: '🐟' },
  { id: 51, name: 'Lamb', category: 'Proteins', serving: '4 oz (113g)', calories: 250, protein: 26, carbs: 0, fat: 16, emoji: '🥩' },
  { id: 52, name: 'Protein Powder', category: 'Proteins', serving: '1 scoop (30g)', calories: 120, protein: 24, carbs: 3, fat: 1.5, emoji: '🥤' },

  // ── Grains ──
  { id: 60, name: 'White Rice', category: 'Grains', serving: '1 cup cooked (186g)', calories: 242, protein: 4.4, carbs: 53, fat: 0.4, emoji: '🍚' },
  { id: 61, name: 'Brown Rice', category: 'Grains', serving: '1 cup cooked (202g)', calories: 248, protein: 5.5, carbs: 52, fat: 2, emoji: '🍚' },
  { id: 62, name: 'Oatmeal', category: 'Grains', serving: '1 cup cooked (234g)', calories: 154, protein: 5.4, carbs: 27, fat: 2.6, emoji: '🥣' },
  { id: 63, name: 'Whole Wheat Bread', category: 'Grains', serving: '1 slice (43g)', calories: 81, protein: 4, carbs: 14, fat: 1.1, emoji: '🍞' },
  { id: 64, name: 'Pasta', category: 'Grains', serving: '1 cup cooked (140g)', calories: 220, protein: 8.1, carbs: 43, fat: 1.3, emoji: '🍝' },
  { id: 65, name: 'Quinoa', category: 'Grains', serving: '1 cup cooked (185g)', calories: 222, protein: 8.1, carbs: 39, fat: 3.6, emoji: '🌾' },
  { id: 66, name: 'Tortilla (flour)', category: 'Grains', serving: '1 large (64g)', calories: 200, protein: 5, carbs: 34, fat: 5, emoji: '🫔' },
  { id: 67, name: 'Bagel', category: 'Grains', serving: '1 medium (105g)', calories: 270, protein: 10, carbs: 53, fat: 1.6, emoji: '🥯' },
  { id: 68, name: 'Granola', category: 'Grains', serving: '1/2 cup (61g)', calories: 299, protein: 7, carbs: 32, fat: 15, emoji: '🥣' },
  { id: 69, name: 'Pancakes', category: 'Grains', serving: '2 medium', calories: 280, protein: 6, carbs: 38, fat: 11, emoji: '🥞' },

  // ── Dairy ──
  { id: 80, name: 'Whole Milk', category: 'Dairy', serving: '1 cup (244ml)', calories: 149, protein: 8, carbs: 12, fat: 8, emoji: '🥛' },
  { id: 81, name: 'Greek Yogurt', category: 'Dairy', serving: '1 cup (245g)', calories: 130, protein: 22, carbs: 8, fat: 0.7, emoji: '🥛' },
  { id: 82, name: 'Cheddar Cheese', category: 'Dairy', serving: '1 oz (28g)', calories: 113, protein: 7, carbs: 0.4, fat: 9, emoji: '🧀' },
  { id: 83, name: 'Mozzarella', category: 'Dairy', serving: '1 oz (28g)', calories: 85, protein: 6.3, carbs: 0.7, fat: 6.3, emoji: '🧀' },
  { id: 84, name: 'Cottage Cheese', category: 'Dairy', serving: '1 cup (226g)', calories: 206, protein: 28, carbs: 6.2, fat: 9, emoji: '🧀' },
  { id: 85, name: 'Butter', category: 'Dairy', serving: '1 tbsp (14g)', calories: 102, protein: 0.1, carbs: 0, fat: 11.5, emoji: '🧈' },
  { id: 86, name: 'Cream Cheese', category: 'Dairy', serving: '2 tbsp (29g)', calories: 99, protein: 1.7, carbs: 1.6, fat: 9.8, emoji: '🧈' },
  { id: 87, name: 'Almond Milk', category: 'Dairy', serving: '1 cup (240ml)', calories: 39, protein: 1, carbs: 3.4, fat: 2.5, emoji: '🥛' },

  // ── Snacks ──
  { id: 100, name: 'Almonds', category: 'Snacks', serving: '1 oz (28g)', calories: 164, protein: 6, carbs: 6, fat: 14, emoji: '🥜' },
  { id: 101, name: 'Peanut Butter', category: 'Snacks', serving: '2 tbsp (32g)', calories: 190, protein: 7, carbs: 7, fat: 16, emoji: '🥜' },
  { id: 102, name: 'Trail Mix', category: 'Snacks', serving: '1/4 cup (38g)', calories: 175, protein: 5, carbs: 16, fat: 11, emoji: '🥜' },
  { id: 103, name: 'Protein Bar', category: 'Snacks', serving: '1 bar (60g)', calories: 210, protein: 20, carbs: 24, fat: 7, emoji: '🍫' },
  { id: 104, name: 'Dark Chocolate', category: 'Snacks', serving: '1 oz (28g)', calories: 170, protein: 2, carbs: 13, fat: 12, emoji: '🍫' },
  { id: 105, name: 'Popcorn', category: 'Snacks', serving: '3 cups popped', calories: 93, protein: 3, carbs: 19, fat: 1.1, emoji: '🍿' },
  { id: 106, name: 'Hummus', category: 'Snacks', serving: '2 tbsp (30g)', calories: 70, protein: 2, carbs: 6, fat: 5, emoji: '🫘' },
  { id: 107, name: 'Rice Cakes', category: 'Snacks', serving: '2 cakes', calories: 70, protein: 1.4, carbs: 15, fat: 0.5, emoji: '🍘' },
  { id: 108, name: 'Chips (Potato)', category: 'Snacks', serving: '1 oz (28g)', calories: 152, protein: 2, carbs: 15, fat: 10, emoji: '🍟' },
  { id: 109, name: 'Pretzels', category: 'Snacks', serving: '1 oz (28g)', calories: 108, protein: 3, carbs: 23, fat: 1, emoji: '🥨' },
  { id: 110, name: 'Dried Mango', category: 'Snacks', serving: '1/4 cup (40g)', calories: 128, protein: 0.5, carbs: 31, fat: 0.2, emoji: '🥭' },
  { id: 111, name: 'Walnuts', category: 'Snacks', serving: '1 oz (28g)', calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, emoji: '🥜' },

  // ── Beverages ──
  { id: 120, name: 'Coffee (black)', category: 'Beverages', serving: '1 cup (240ml)', calories: 2, protein: 0.3, carbs: 0, fat: 0, emoji: '☕' },
  { id: 121, name: 'Latte', category: 'Beverages', serving: '12 oz (360ml)', calories: 190, protein: 10, carbs: 18, fat: 7, emoji: '☕' },
  { id: 122, name: 'Orange Juice', category: 'Beverages', serving: '1 cup (248ml)', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, emoji: '🧃' },
  { id: 123, name: 'Smoothie (mixed berry)', category: 'Beverages', serving: '12 oz (360ml)', calories: 210, protein: 4, carbs: 44, fat: 2, emoji: '🥤' },
  { id: 124, name: 'Protein Shake', category: 'Beverages', serving: '12 oz (360ml)', calories: 230, protein: 30, carbs: 12, fat: 5, emoji: '🥤' },
  { id: 125, name: 'Green Tea', category: 'Beverages', serving: '1 cup (240ml)', calories: 2, protein: 0.5, carbs: 0, fat: 0, emoji: '🍵' },
  { id: 126, name: 'Coca-Cola', category: 'Beverages', serving: '12 oz (355ml)', calories: 140, protein: 0, carbs: 39, fat: 0, emoji: '🥤', barcode: '049000042566' },
  { id: 127, name: 'Coconut Water', category: 'Beverages', serving: '1 cup (240ml)', calories: 46, protein: 1.7, carbs: 9, fat: 0.5, emoji: '🥥' },

  // ── Fast Food ──
  { id: 140, name: 'Cheeseburger', category: 'Fast Food', serving: '1 burger', calories: 535, protein: 28, carbs: 40, fat: 30, emoji: '🍔' },
  { id: 141, name: 'Chicken Nuggets', category: 'Fast Food', serving: '6 pieces', calories: 280, protein: 14, carbs: 18, fat: 17, emoji: '🍗' },
  { id: 142, name: 'French Fries', category: 'Fast Food', serving: 'medium (117g)', calories: 365, protein: 4, carbs: 44, fat: 19, emoji: '🍟' },
  { id: 143, name: 'Pizza (Pepperoni)', category: 'Fast Food', serving: '1 slice', calories: 313, protein: 13, carbs: 36, fat: 13, emoji: '🍕' },
  { id: 144, name: 'Hot Dog', category: 'Fast Food', serving: '1 with bun', calories: 290, protein: 11, carbs: 24, fat: 17, emoji: '🌭' },
  { id: 145, name: 'Burrito', category: 'Fast Food', serving: '1 large', calories: 580, protein: 24, carbs: 68, fat: 22, emoji: '🌯' },
  { id: 146, name: 'Taco', category: 'Fast Food', serving: '1 taco', calories: 210, protein: 10, carbs: 21, fat: 10, emoji: '🌮' },
  { id: 147, name: 'Sub Sandwich', category: 'Fast Food', serving: '6 inch', calories: 410, protein: 22, carbs: 46, fat: 16, emoji: '🥖' },
  { id: 148, name: 'Fried Chicken', category: 'Fast Food', serving: '1 thigh', calories: 294, protein: 18, carbs: 11, fat: 20, emoji: '🍗' },
  { id: 149, name: 'Sushi Roll', category: 'Fast Food', serving: '6 pieces', calories: 255, protein: 9, carbs: 38, fat: 7, emoji: '🍣' },

  // ── Desserts ──
  { id: 160, name: 'Ice Cream (vanilla)', category: 'Desserts', serving: '1/2 cup (66g)', calories: 137, protein: 2.3, carbs: 16, fat: 7, emoji: '🍦' },
  { id: 161, name: 'Chocolate Cake', category: 'Desserts', serving: '1 slice (95g)', calories: 352, protein: 5, carbs: 51, fat: 14, emoji: '🍰' },
  { id: 162, name: 'Cookie (chocolate chip)', category: 'Desserts', serving: '1 large', calories: 220, protein: 2, carbs: 30, fat: 11, emoji: '🍪' },
  { id: 163, name: 'Brownie', category: 'Desserts', serving: '1 piece (56g)', calories: 227, protein: 3, carbs: 36, fat: 9, emoji: '🍫' },
  { id: 164, name: 'Cheesecake', category: 'Desserts', serving: '1 slice (125g)', calories: 401, protein: 7, carbs: 28, fat: 30, emoji: '🍰' },
  { id: 165, name: 'Donut', category: 'Desserts', serving: '1 glazed', calories: 253, protein: 4, carbs: 31, fat: 12, emoji: '🍩' },
  { id: 166, name: 'Muffin (blueberry)', category: 'Desserts', serving: '1 large', calories: 385, protein: 6, carbs: 55, fat: 16, emoji: '🧁' },
  { id: 167, name: 'Frozen Yogurt', category: 'Desserts', serving: '1/2 cup (72g)', calories: 110, protein: 3, carbs: 22, fat: 1.5, emoji: '🍦' },
];

// Lookup helpers
export function searchFoods(query, category = 'All') {
  const q = query.toLowerCase().trim();
  return FOODS.filter(f => {
    const matchCategory = category === 'All' || f.category === category;
    const matchQuery = !q || f.name.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });
}

export function getFoodById(id) {
  return FOODS.find(f => f.id === id);
}

export function getFoodByBarcode(barcode) {
  return FOODS.find(f => f.barcode === barcode);
}
