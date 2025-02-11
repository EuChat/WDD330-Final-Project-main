async function getRecipes() {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian,dessert&number=1';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'YOUR_API_KEY_HERE', // Replace with a secure method
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        // Check if request was successful
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Check if recipes exist
        if (!data.recipes || data.recipes.length === 0) {
            throw new Error("No recipes found");
        }

        console.log(data.recipes[0]); // Output the first recipe
    } catch (error) {
        console.error("Error fetching recipe:", error.message);
    }
}

getRecipes();
