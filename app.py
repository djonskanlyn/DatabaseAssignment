from flask import Flask, render_template, request, redirect, url_for, jsonify										
from models import db, User, Email

app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)

with app.app_context():
    db.create_all()

# home page
@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")

# gallery page
@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

# faqs page
@app.route("/faqs")
def faqs():
    return render_template("faqs.html")

# meals page
@app.route("/meals")
def meals():
    return render_template("meals.html")

# favourites page 
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

# ingredients page 
@app.route("/ingredients")
def ingredients():
    # Create a list of tuples (mealId, mealName) for the dropdown
    meal_options = [(mealId, data['Meal']) for mealId, data in favourite_data.items()]
    return render_template("ingredients.html", meal_options=meal_options)

# users page 
@app.route("/users")
def users():  
    user_data = User.query.all()                        
    return render_template("users.html", users = user_data)

@app.route("/user_form")
def user_form():
     return render_template("user_form.html")

@app.route("/user_insert", methods=['POST'])
def user_insert():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")

    new_user = User(
        username = username,
        password = password
    )

    new_email = Email(
        email = email,
        user = new_user
    )

    db.session.add(new_user)     
    db.session.add(new_email)
    db.session.commit()

    return redirect( url_for('users') )

@app.route("/user_delete/<int:user_id>")
def user_delete(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect( url_for('users'))

@app.route("/user_edit/<int:user_id>")
def user_edit(user_id):
    user_data = User.query.get_or_404(user_id)
    return render_template("user_edit.html", user=user_data)

@app.route("/user_update/<int:user_id>", methods=["POST"])
def user_update(user_id):
    user = User.query.get_or_404(user_id)
    email = Email.query.get_or_404(user_id)

    new_username = request.form.get("username")
    new_email    = request.form.get("email")
    new_password = request.form.get("password")

    user.username = new_username
    user.password = new_password
    email.email = new_email

    db.session.commit()

    return redirect( url_for('users') )


if __name__ == "__main__":
    app.run(debug=True)