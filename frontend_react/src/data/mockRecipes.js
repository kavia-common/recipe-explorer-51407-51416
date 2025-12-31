/**
 * Local mock dataset for the Recipe Explorer app.
 * Images use simple gradients/placeholders; keep URLs optional to test placeholder behavior.
 */

export const mockRecipes = [
  {
    id: "r1",
    title: "Lemon Garlic Salmon Bowl",
    description: "Bright lemon, garlic, and herbs over a fluffy rice bowl with crisp veggies.",
    imageUrl: "",
    prepTimeMinutes: 10,
    cookTimeMinutes: 18,
    servings: 2,
    tags: ["seafood", "quick", "high-protein"],
    ingredients: [
      "2 salmon fillets",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 lemon (zest + juice)",
      "1 cup cooked jasmine rice",
      "1 cup cucumber, sliced",
      "1 cup cherry tomatoes, halved",
      "Salt and pepper",
      "Fresh dill or parsley (optional)"
    ],
    instructions: [
      "Pat salmon dry and season with salt and pepper.",
      "Heat olive oil in a skillet over medium heat; cook salmon 4–5 minutes per side until flaky.",
      "Add garlic, lemon zest, and lemon juice to the pan; spoon over salmon for 30–60 seconds.",
      "Assemble bowls with rice, cucumber, tomatoes, and salmon. Finish with herbs."
    ]
  },
  {
    id: "r2",
    title: "Crispy Chickpea & Avocado Salad",
    description: "Creamy avocado + crunchy chickpeas with a tangy lime dressing.",
    imageUrl: "",
    prepTimeMinutes: 12,
    cookTimeMinutes: 12,
    servings: 2,
    tags: ["vegetarian", "gluten-free", "salad"],
    ingredients: [
      "1 can chickpeas, drained and rinsed",
      "1 tbsp olive oil",
      "1/2 tsp smoked paprika",
      "1 avocado, diced",
      "2 cups mixed greens",
      "1/2 red onion, thinly sliced",
      "1 lime (juice)",
      "Salt and pepper"
    ],
    instructions: [
      "Toss chickpeas with olive oil, paprika, salt, and pepper.",
      "Roast at 425°F (220°C) for ~12 minutes until crisp (or pan-toast).",
      "Combine greens, onion, and avocado in a bowl.",
      "Top with chickpeas and drizzle with lime juice. Season to taste."
    ]
  },
  {
    id: "r3",
    title: "Creamy Tomato Basil Pasta",
    description: "Comfort pasta with a silky tomato-basil sauce in under 30 minutes.",
    imageUrl:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1200&q=60",
    prepTimeMinutes: 8,
    cookTimeMinutes: 18,
    servings: 4,
    tags: ["pasta", "comfort", "family"],
    ingredients: [
      "12 oz pasta (penne or rigatoni)",
      "1 tbsp olive oil",
      "3 cloves garlic, minced",
      "1 can crushed tomatoes",
      "1/3 cup heavy cream (or coconut cream)",
      "1/2 cup fresh basil, torn",
      "Salt and pepper",
      "Parmesan (optional)"
    ],
    instructions: [
      "Cook pasta according to package directions; reserve 1/2 cup pasta water.",
      "Sauté garlic in olive oil for 30 seconds.",
      "Add crushed tomatoes, simmer 8–10 minutes. Stir in cream.",
      "Toss with pasta, loosen with pasta water if needed. Add basil and serve."
    ]
  },
  {
    id: "r4",
    title: "Spicy Sheet-Pan Chicken Fajitas",
    description: "One-pan fajitas with bell peppers and onion—fast cleanup, big flavor.",
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=60",
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    tags: ["chicken", "sheet-pan", "spicy"],
    ingredients: [
      "1 lb chicken breast, sliced",
      "2 bell peppers, sliced",
      "1 onion, sliced",
      "2 tbsp olive oil",
      "1 tbsp fajita seasoning",
      "Salt and pepper",
      "Tortillas, salsa, lime (to serve)"
    ],
    instructions: [
      "Preheat oven to 450°F (232°C).",
      "Toss chicken and veggies with olive oil, seasoning, salt, and pepper.",
      "Spread on a sheet pan; bake 18–20 minutes, tossing once halfway.",
      "Serve with warm tortillas, salsa, and lime."
    ]
  },
  {
    id: "r5",
    title: "Blueberry Overnight Oats",
    description: "A make-ahead breakfast with blueberries, yogurt, and oats.",
    imageUrl: "",
    prepTimeMinutes: 6,
    cookTimeMinutes: 0,
    servings: 1,
    tags: ["breakfast", "no-cook", "meal-prep"],
    ingredients: [
      "1/2 cup rolled oats",
      "1/2 cup milk (dairy or plant)",
      "1/3 cup Greek yogurt",
      "1 tsp chia seeds",
      "1/2 cup blueberries",
      "1 tsp honey or maple syrup (optional)",
      "Pinch of salt"
    ],
    instructions: [
      "Stir oats, milk, yogurt, chia, sweetener, and salt in a jar.",
      "Fold in blueberries (or add on top).",
      "Cover and refrigerate at least 4 hours or overnight.",
      "Eat cold, or warm briefly if desired."
    ]
  }
];
