function toggleTheme() {
  document.body.classList.toggle("dark");
}

async function addMeal() {
  const foodName = document.getElementById("foodName").value;
  const list = document.getElementById("mealHistory");
  const li = document.createElement("li");
  li.textContent = foodName + " (pendiente análisis)";
  list.appendChild(li);
  document.getElementById("summaryText").innerText = "Recalculando...";
}
