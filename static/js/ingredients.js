document.getElementById('meals-dropdown').addEventListener('change', function() {
    var mealId = this.value;
    if (mealId) {  // Ensure that a valid mealId is selected
        fetchIngredients(mealId);
    }
});


// function to fetch meal details
function fetchIngredients(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`) // fetch data from api referencing selected meal id
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const meal = data.meals[0]; // create a variable of the first meal returned
            displayIngredients(meal); // use the displayIngredients() function on the data returned
        })
        // catch error code
        .catch(error => {
            console.error('Error fetching ingredients:', error); // record message error in console
        });
}

function displayIngredients(meal) {
    if (!meal) {
        document.getElementById('mealDetails').innerHTML = "<p>No details found for this meal.</p>";
        return;
    }

    // Start building the HTML string for a two-column table

    //<th><h3>Ingredient</h3></th><th>Measure</th>
    let ingredientsHtml = '<table>';
    ingredientsHtml += '<tr></tr>';

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
            // Each row in the table corresponds to one ingredient and its measure
            ingredientsHtml += `<tr id="ingredientRow${i}"><td>${ingredient}</td><td>${measure}</td>`;
            ingredientsHtml += `<td><a href="#" onclick="removeIngredient(${i}); return false;" style="color: red; text-decoration: none;">&#10060; </a>   `;
            ingredientsHtml += `<a href="#" onclick="crossOut(${i}); return false;" style="color: green; text-decoration: none;">&#10004;</a></td></tr>`;
        }
    }

    ingredientsHtml += '</table>';  // Close the table tag
    document.getElementById('ingredientsMeasures').innerHTML = ingredientsHtml;  // Update the inner HTML of the mealDetails element
}
// Function to remove an ingredient row
function removeIngredient(index) {
    const row = document.getElementById(`ingredientRow${index}`);
    if (row) {
        row.parentNode.removeChild(row);
    }
}

// Function to cross out an ingredient
function crossOut(index) {
    const row = document.getElementById(`ingredientRow${index}`);
    if (row) {
        row.style.textDecoration = row.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    }
}