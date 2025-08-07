import os
import pickle

import numpy as np
from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

# --- Flask setup ---
app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# --- Load model and class labels ---
MODEL_PATH = "plant_disease_model.h5"
LABELS_PATH = "class_labels.pkl"

# Load the trained model
model = load_model(MODEL_PATH)

# Load class labels and sort them by index
with open(LABELS_PATH, "rb") as f:
    class_indices = pickle.load(f)

class_labels = [
    label for label, idx in sorted(class_indices.items(), key=lambda item: item[1])
]

# --- Routes ---


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return render_template("index.html", error="No file part in the request.")

    file = request.files["image"]

    if file.filename == "":
        return render_template("index.html", error="No selected file.")

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Preprocess image
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        # Predict
        prediction = model.predict(img_array)
        class_idx = np.argmax(prediction)

        # Safety check
        if class_idx >= len(class_labels):
            predicted_label = "Unknown"
        else:
            predicted_label = class_labels[class_idx]

        confidence = round(float(np.max(prediction)) * 100, 2)

        return render_template(
            "index.html",
            prediction=predicted_label,
            confidence=confidence,
            image_path=filepath,
        )

    return render_template(
        "index.html", error="Something went wrong with the image upload."
    )


# --- Main ---
if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
