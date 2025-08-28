// Aquí conectarás tu API nutricional (Edamam/Nutritionix)
const APP_ID = "YOUR_APP_ID";
const APP_KEY = "YOUR_APP_KEY";

async function analyzeFood(foodName) {
  const res = await fetch(
    `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(foodName)}`
  );
  const data = await res.json();
  return data;
}
