// Random Meal API

document.addEventListener('DOMContentLoaded', function() { // checks that the DOM has loaded
    fetchCategories(); // runs fetch meal categories function
    document.getElementById('fetchMeal').addEventListener('click', fetchRandomMeal); // listen out for click on fetch meal button and call fetch random meal function
    document.getElementById('saveFavourite').addEventListener('click', sendRecipeToFavourites);
});

// function to fetch meal categories from API
function fetchCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php') // fetch data from api
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const select = document.getElementById('categorySelect'); // retrieve the 'categorySelect' element from document
            data.categories.forEach(category => { // for each element in categories list in JSON (data)
                const option = document.createElement('option'); // create on option element
                option.value = category.strCategory; // set the value of the category option to the name string (strCategory is a value in the JSON)
                option.textContent = category.strCategory; // set the text content of the category option to the name string
                select.appendChild(option); // add the option element to the dropdown ('categorySelect' element from document)
            });
        })
        .catch(error => { // if there is an error
            console.error('Error loading categories:', error); // record message error in console
        });
}

// function to fetch random meal
function fetchRandomMeal() {
    const selectedCategory = document.getElementById('categorySelect').value; // identify selected meal category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`) // fetch data from api referencing selected meal category
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const meals = data.meals; // store the meals data from JSON object as meals 
            const randomIndex = Math.floor(Math.random() * meals.length); // select a random number as an index within the length of t/he array of meals pulled down
            const randomMeal = meals[randomIndex]; // store the meal identified by the random index
            fetchMealDetails(randomMeal.idMeal); // use the fetchMealDetails() function to pulls the meal details data based on the meal id. (idMeal is a value in the JSON)
        })
        // catch error code
        .catch(error => {
            console.error('Error fetching meals:', error); // record message error in console
            document.getElementById('mealName').innerHTML = `<p>Error fetching data. Please try again.</p>`; // provide error message on webpage
        });
}

// function to fetch meal details
function fetchMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`) // fetch data from api referencing selected meal id
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const meal = data.meals[0]; // create a variable of the first meal returned
            displayMeal(meal); // use the displayMeal() function on the data returned
        })
        // catch error code
        .catch(error => {
            console.error('Error fetching meal details:', error); // record message error in console
            document.getElementById('mealName').innerHTML = `<p>Error fetching meal details. Please try again.</p>`; // provide error message on webpage
        });
}

function displayMeal(meal) {

    const mealIdElement = document.getElementById('mealId'); // get the mealId element of the DOM
    const mealClassElement = document.getElementById('mealClass'); // get the mealClass element of the DOM
    const mealNameElement = document.getElementById('mealName'); // get the mealName element of the DOM
    const mealThumbElement = document.getElementById('mealThumb'); // get the mealThumb element of the DOM
    const mealInstructionsElement = document.getElementById('mealInstructions'); // get the mealInstructions element of the DOM

    const mealIdData = meal.idMeal || 'No meal found';
    const mealClassData = document.getElementById('categorySelect').value;
    const mealNameData = meal.strMeal || 'No meal found';
    const mealThumbData = meal.strMealThumb || 'static/images/No_Image_Available.jpg'; 
    const instructions = meal.strInstructions || 'No cooking instructions provided.';

    // Regex to split on periods, question marks, and exclamation marks that are followed by a space or end of string, and not preceded by a common abbreviation
    const mealInstructionsData = instructions.split(/(?<!\b(?:Mr|Mrs|Dr|Ms|Jr|Sr|St)\.)(?<!\b\d)\.\s+|\?\s+|\!\s+/g).map(item => 
        item.trim() ? `<li>${item.trim()}</li>` : ''
    ).join('');

    mealIdElement.innerHTML = `<h1>${mealIdData}</h1>`;

    mealClassElement.innerHTML = `<h1>${mealClassData}</h1>`;

    mealNameElement.innerHTML = `<h2>${mealNameData}</h2>`;

    mealThumbElement.innerHTML = `
        <div class="styled-frame">
            <img src="${mealThumbData}" alt="Image of ${mealNameData}" class="meal-image" style="width: 300px;">
        </div>
    `;

    mealInstructionsElement.innerHTML = `
        <div class="styled-frame">
            <ul>${mealInstructionsData}</ul>
        </div>
    `;

    // sends data to form element ...
    document.getElementById('mealIdForm').value = mealIdData;  
    document.getElementById('mealClassForm').value = mealClassData; 
    document.getElementById('mealNameForm').value = mealNameData;   
    document.getElementById('mealThumbForm').value = mealThumbData;   
    document.getElementById('mealInstructionsForm').value = instructions;

    document.getElementById('SaveFavouriteButton').disabled = false; // Enable the button
}

