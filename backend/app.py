import os

import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)  # allow frontend to connect

model = load_model("plant_disease_model.h5")
class_names = [
    "Apple___Black_rot",
    "Tomato___Late_blight",
    "NewPlant___DiseaseX",
]  # update this!


@app.route("/predict", methods=["POST"])
def predict():
    img_file = request.files["image"]
    img_path = os.path.join("temp.jpg")
    img_file.save(img_path)

    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    index = np.argmax(predictions[0])
    disease = class_names[index]

    return jsonify({"prediction": disease})


if __name__ == "__main__":
    app.run(debug=True)
