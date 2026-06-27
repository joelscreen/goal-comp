from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

client = genai.Client(
    api_key="AQ.Ab8RN6IyTV7mzT2_TlFT6wFYMzmE0_PSVmeoKXmcR91gPz7lbQ"
)

freshness_data = {
    "temperature": "",
    "humidity": "",
    "freshness": ""
}

@app.route('/')
def main_page():
    return render_template('index.html')

@app.route('/predict')
def predict():
    return render_template('predict.html')

@app.route('/preserve')
def preserve():
    return render_template('preserve.html')

@app.route('/provide')
def provide():
    return render_template('provide.html')

@app.route('/recipes')
def recipes():
    return render_template('recipes.html')

@app.route("/api/recipes", methods=["GET", "POST"])
def recipes_api():
    data = request.json
    message = data.get("message", "")
    items = data.get("items", [])

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=f"""
                You are a Recipe AI developed by Joel Mendonca, Naisha Gupta, Aswin Kumaran, and Jasmitha Krishna (aka Jeshwara). If asked about your identity, tell them this.

                Answer in plain text only.
                Do not use markdown.
                Use normal paragraphs.
                Use 300 words maximum. 
                Explain in bullets points.
                Only respond to questions related to food recipes and food wastage. If the user asks anything else, give a 2-3 sentences reply saying that you can only help with things related to food recipes.
                Always respond kindly to the user.

                User's Available foods and expiry risk scores: {items}

                When asked about a recipe suggestion, try to include some food that have ingredients not included above, and ingredients included above, if there are any. Also mention that you have taken those ingredients from the user's statistics.

                If asked about recipes, include a minimum of 5-6 different recipes, with minimum of 4 recipes which have ingredients that the user doesn't have and 2-3 recipes which have ingredients that the user has.
                
                When recommending recipes to the user, if an item has a higher expiry risk score, try to suggest recipes that use a lot of that ingredient.

                User: {message}
                """
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({
            "reply": f"Error: {str(e)}"
        })
    
@app.route("/devices")
def devices():
    return render_template('devices.html')

@app.route("/module-input")
def module_input():
    return render_template('module-input.html')

@app.route("/module-reg")
def module_reg():
    return render_template('module-reg.html')

@app.route("/update-freshness", methods=["POST"])
def update_freshness():
    global freshness_data

    data = request.json

    freshness_data["temperature"] = data.get("temperature", "")
    freshness_data["humidity"] = data.get("humidity", "")
    freshness_data["freshness"] = data.get("freshness", "")

    return jsonify({
        "success": True
    })

@app.route("/get-freshness")
def get_freshness():
    return jsonify(freshness_data)

@app.route("/notifications")
def notifications():
    return render_template('notifications.html')

@app.route("/eco-bucket")
def eco_bucket():
    return render_template('eco-bucket.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
