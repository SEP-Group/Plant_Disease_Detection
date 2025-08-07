import os
import pickle

import numpy as np
from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load model and class labels
model = load_model("plant_disease_model.h5")

with open("class_labels.pkl", "rb") as f:
    class_indices = pickle.load(f)

# Sort class labels by index to get correct order
class_labels = [
    label for label, idx in sorted(class_indices.items(), key=lambda x: x[1])
]

IMG_SIZE = 224


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return render_template("index.html", error="No file part")
    file = request.files["image"]
    if file.filename == "":
        return render_template("index.html", error="No selected file")

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Prepare image for model
    img = image.load_img(filepath, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Predict
    preds = model.predict(img_array)
    class_idx = np.argmax(preds)
    confidence = round(float(np.max(preds)) * 100, 2)

    if class_idx >= len(class_labels):
        prediction = "Unknown"
    else:
        prediction = class_labels[class_idx]

    return render_template(
        "index.html", prediction=prediction, confidence=confidence, image_path=filepath
    )


if __name__ == "__main__":
    app.run(debug=True)
