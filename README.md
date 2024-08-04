# Readme

The link to the website can be found here: [python project website](https://pythonmodule.onrender.com/home). 

(Note that this is provided using render.com's free webservice and needs to re-deploy after periods of not being used. The link will work, however it may take a few minutes to load at first).

The link to the github for the project can be found here: [python project github](https://github.com/djonskanlyn/PythonModule).

The website has a health and fitness theme and has 6 webpages:
* [home](https://pythonmodule.onrender.com/home)
* [gallery](https://pythonmodule.onrender.com/gallery)
* [FAQs](https://pythonmodule.onrender.com/faqs)
* [meals](https://pythonmodule.onrender.com/meals)
* [favourites](https://pythonmodule.onrender.com/favourites)
* [ingredients](https://pythonmodule.onrender.com/ingredients)

The general page structure is the same for all 6 pages. 

Each page is split into 5 sections (header, main, aside-1, aside-2, and footer) using flex-box styling.

The footer on each page has a copyright marker and the authors e-mail.

## Home Page

The [home](https://pythonmodule.onrender.com/home) page deals with the primary purpose of the website; the explanation of the Basal Metabolic Rate (BMR). It features an embedded youtube video and a brief paragraph explaining the topic in the main section; an interactive BMR calculator in the first aside; and a form to register an account in the second aside. Both the calculator and registration form have in-form validations.

The **BMR calculator** asks the user to select their gender, and enter their age, height and weight. There are validations on age (between 16yo & 90yo); height (between 1.25m & 2.5m); and weight (between 40kg & 160kg). Hitting the calculate button triggers the validations. If there are validation issues the issue will appear in red below the calculator. If the validations are passed the BMR will appear in green below the calculator.

The **Registration Form** asks the user for their name; e-mail address; and asks them to create a password, which must be repeated. There is a check box that will show the password characters if checked. The validations for the form include:
* checking that all 4 inputs are populated;
* checking that a valid e-mail is submitted;
* checking that the password has at least 8 characters and contains at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character.
* checking that both password submissions match.

If there are validation issues the issue will appear in red below the registration form. If the validations are passed a success message will appear in green below the calculator.

## Gallery Page

The [gallery](https://pythonmodule.onrender.com/gallery) page features an interactive slider with images of health foods. The images can be accessed by thumbnails below the currently selected image and by previous / next arrows on the selected image.



## FAQs Page

The [FAQs](https://pythonmodule.onrender.com/faqs) page features 10 questions in an expanding accordion format. When the user clicks on the '+' symbol, the answer will expand. The answer will collapse when the user clicks on an expanded questions '-' symbol.


## Meals Page

The [meals](https://pythonmodule.onrender.com/meals) page is linked to an [API](https://www.themealdb.com/api.php) that allows users to generate a random recipe, based on selecting a category of recipes to choose from, and clicking the **fetch a random meal** button. The name of the recipe, an image of the meal and the cooking instructions will appear in bullet point form.

The page also has a **Save Favourites** button, which is only enabled after a recipe has been generated. Clicking the **Save Favourites** button will save the recipe and bring the user to the [favourites](https://pythonmodule.onrender.com/favourites) page.

## Favourites Page

The [favourites](https://pythonmodule.onrender.com/favourites) page will have no recipes if none have been saved as a favourite. The recipes appear in a table with an image of the meal, the name of the recipe, the category of the recipe and the first few characters of the cooking instructions. There is also a "+" symbol to expand the detailed cooking instructions (and subsequently a "-" symbol to collapse the instructions). The is also a red **X** to remove a recipe from the favourites page.


## Ingredients Page

The [ingredients](https://pythonmodule.onrender.com/ingredients) page is empty until a receipe chosen from the available saved favourites on the [favourites](https://pythonmodule.onrender.com/favourites) page. When the user selects a recipe a table with all the ingredients, the measure for those ingredients; along with a red **X** to remove the ingredient from the list; and a green **check** to "cross off" the ingredient on the list.