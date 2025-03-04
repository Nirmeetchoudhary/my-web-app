document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('food-input').value;
    if (query) {
        searchRecipes(query);
    }
});

function searchRecipes(query) {
    const apiKey = 'a9fffb156669410ca87e41c585f0999a';
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10&addRecipeInformation=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.title;
        recipeCard.appendChild(recipeTitle);

        const viewRecipeButton = document.createElement('button');
        viewRecipeButton.textContent = 'View Recipe';
        viewRecipeButton.addEventListener('click', () => {
            getRecipeDetails(recipe.id);
        });
        recipeCard.appendChild(viewRecipeButton);

        resultsDiv.appendChild(recipeCard);
    });
}

function getRecipeDetails(recipeId) {
    const apiKey = 'a9fffb156669410ca87e41c585f0999a';
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayRecipeDetails(recipe) {
    const modal = document.getElementById('recipe-modal');
    const recipeDetailsDiv = document.getElementById('recipe-details');

    recipeDetailsDiv.innerHTML = '';

    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeDetailsDiv.appendChild(recipeImage);

    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = recipe.title;
    recipeDetailsDiv.appendChild(recipeTitle);

    const calories = document.createElement('p');
    calories.textContent = `Calories: ${recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 'N/A'} kcal`;
    recipeDetailsDiv.appendChild(calories);

    const fat = document.createElement('p');
    fat.textContent = `Fat: ${recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 'N/A'} g`;
    recipeDetailsDiv.appendChild(fat);

    const carbs = document.createElement('p');
    carbs.textContent = `Carbohydrates: ${recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 'N/A'} g`;
    recipeDetailsDiv.appendChild(carbs);

    const protein = document.createElement('p');
    protein.textContent = `Protein: ${recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 'N/A'} g`;
    recipeDetailsDiv.appendChild(protein);

    const instructions = document.createElement('div');
    instructions.classList.add('instructions');
    const instructionsTitle = document.createElement('h4');
    instructionsTitle.textContent = 'Instructions';
    instructions.appendChild(instructionsTitle);

    // Ensure `analyzedInstructions` exists and is not empty
    if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
        recipe.analyzedInstructions[0].steps.forEach(step => {
            const stepElement = document.createElement('p');
            stepElement.textContent = `${step.number}. ${step.step}`;
            instructions.appendChild(stepElement);
        });
    } else {
        const noInstructions = document.createElement('p');
        noInstructions.textContent = 'No instructions available for this recipe.';
        instructions.appendChild(noInstructions);
    }

    recipeDetailsDiv.appendChild(instructions);

    modal.style.display = 'flex';
}

document.querySelector('.close-button').addEventListener('click', function() {
    const modal = document.getElementById('recipe-modal');
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('recipe-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Modify the 'View Recipe' button's event listener
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.title;
        recipeCard.appendChild(recipeTitle);

        // View Recipe Button
        const viewRecipeButton = document.createElement('button');
        viewRecipeButton.textContent = 'View Recipe';
        viewRecipeButton.addEventListener('click', () => {
            window.location.href = `recipe.html?id=${recipe.id}`;
        });
        recipeCard.appendChild(viewRecipeButton);

        // Add to Favorites Button
        const favoritesButton = document.createElement('button');
        favoritesButton.innerHTML = '<i class="fas fa-heart"></i>';
        favoritesButton.addEventListener('click', () => {
            addToFavorites(recipe.id);
        });
        recipeCard.appendChild(favoritesButton);

        resultsDiv.appendChild(recipeCard);
    });
}

// Add to Favorites Function
function addToFavorites(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Recipe added to favorites!');
    } else {
        alert('Recipe is already in favorites!');
    }
}
