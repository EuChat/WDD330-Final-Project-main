// async function getRecipes() {
//   const url =
//     "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian,dessert&number=1";

//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "YOUR_API_KEY_HERE", // Replace with a secure method
//       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);

//     // Check if request was successful
//     if (!response.ok) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();

//     // Check if recipes exist
//     if (!data.recipes || data.recipes.length === 0) {
//       throw new Error("No recipes found");
//     }

//     window.console.log(data.recipes[0]); // Output the first recipe
//   } catch (error) {
//     window.console.error("Error fetching recipe:", error.message);
//   }
// }

const url = "/json/recipes-temporary.json"

async function GetRecipes() {
  let data = await fetch(url);
  let info = await data.json();
  DisplayCards(info);
};

function DisplayCards(information) {
  let container = document.querySelector("#recipesList");
  information.forEach(recipie => {
    // creation phase
    let card = document.createElement("li");
    let name = document.createElement("h2");
    let ingredientsHead = document.createElement("h3");
    let ingredients = document.createElement("ul");

    // attribute phase
    card.setAttribute("class", "product-card");
    recipie.Ingredients.forEach(ingredient => {
      let item = document.createElement("li");
      item.textContent = ingredient
      ingredients.appendChild(item)

    })

    // text phase
    name.textContent = recipie.Name;
    ingredientsHead.textContent = "Ingredients";

    // addition phase
    card.appendChild(name);
    card.appendChild(ingredientsHead);
    card.appendChild(ingredients);

    container.appendChild(card);
  });
};


GetRecipes();
