import joblib

model = joblib.load(
    "trained_models/resume_classifier.pkl"
)

vectorizer = joblib.load(
    "trained_models/tfidf_vectorizer.pkl"
)

label_encoder = joblib.load(
    "trained_models/label_encoder.pkl"
)


def predict_category(text):

    vector = vectorizer.transform(
        [text]
    )

    prediction = model.predict(
        vector
    )[0]

    category = label_encoder.inverse_transform(
        [prediction]
    )[0]

    return category