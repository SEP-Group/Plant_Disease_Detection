import os

import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, render_template, request
from PIL import Image

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"

# Load your model
model = tf.keras.models.load_model("plant_disease_model.h5")

# Load class names (optional if needed)
import json

with open("class_names.json") as f:
    class_names = json.load(f)


# Image preprocessing
def preprocess_image(image):
    image = image.resize((224, 224))  # adjust to your model's input size
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    image = Image.open(file.stream).convert("RGB")
    processed = preprocess_image(image)
    prediction = model.predict(processed)
    class_id = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    label = (
        class_names[class_id] if class_id < len(class_names) else f"Class {class_id}"
    )

    return jsonify({"label": label, "confidence": f"{confidence*100:.2f}%"})


if __name__ == "__main__":
    app.run(debug=True)
