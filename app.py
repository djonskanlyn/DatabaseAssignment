from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/faqs")
def faqs():
    return render_template("faqs.html")

@app.route("/meals")
def weekend():
    return render_template("meals.html")

@app.route("/fav")
def fav():
    return render_template("fav.html")

@app.route("/ingredients")
def ingredients():
    # Create a list of tuples (mealId, mealName) for the dropdown
    meal_options = [(mealId, data['Meal']) for mealId, data in favourite_data.items()]
    return render_template("ingredients.html", meal_options=meal_options)


favourite_data = {} # create dict to store favourites

@app.route("/favourites", methods=['GET'])
def favourites():
    return render_template("favourites.html", favourites=favourite_data)

@app.route("/favourites", methods=['POST'])
def save_favourite():
    try:
        mealId = request.form['mealIdForm'].strip()
        mealClass = request.form['mealClassForm'].strip()
        mealName = request.form['mealNameForm'].strip()
        mealThumb = request.form['mealThumbForm'].strip()
        mealInstructions = request.form['mealInstructionsForm'].strip()

        if not all([mealId, mealClass, mealName, mealThumb, mealInstructions]):
            return jsonify({"error": "Missing data"}), 400

        favouriteId = int(mealId)  # Convert mealId to an integer to use as a key
        favourite_data[favouriteId] = {
            "Class": mealClass,
            "Meal": mealName,
            "Thumbnail": mealThumb,
            "Instructions": mealInstructions
        }

        return redirect(url_for('favourites'))

    except ValueError:
        return jsonify({"error": "Invalid input for mealId"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/delete_favourite/<int:mealId>", methods=['POST'])
def delete_favourite(mealId):
    if mealId in favourite_data:
        del favourite_data[mealId]
        return redirect(url_for('favourites'))
    return "Meal not found", 404

if __name__ == "__main__":
    app.run(debug=True)