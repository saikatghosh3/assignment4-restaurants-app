
// loader script 
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  loader.style.display = "none";
});



// model and card script

 const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

/* 1 INITIAL LOAD API */
async function loadMeals() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await res.json();
  console.log(data);
  displayMeals(data.meals);
}

/* 2 SEARCH API */
searchBtn.addEventListener("click", async () => {
  const foodName = searchInput.value.trim();

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
  );
  const data = await res.json();
  
  displayMeals(data.meals);
});

/* DISPLAY CARDS */
function displayMeals(meals) {
  cardContainer.innerHTML = "";

  if (!meals) {
    cardContainer.innerHTML = "<p>No food found</p>";
    return;
  }

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
      <p>${meal.strInstructions.split(" ").slice(0, 15).join(" ")}</p>
      <button> VIEW DETAILS</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      getMealDetails(meal.idMeal);
    });

    cardContainer.appendChild(card);
  });
}

/* 3 DETAILS API */
async function getMealDetails(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals[0];

  modalImg.src = meal.strMealThumb;
  modalTitle.innerText = meal.strMeal;
  modalDesc.innerText = meal.strInstructions;

  modal.classList.remove("hidden");
}




/* CLOSE MODAL BY BUTTON */
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/* AND CLOSE MODAL BY CLICKING OUTSIDE */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});


loadMeals();










// scroll to top btn 


const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button after scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll to top on click
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
