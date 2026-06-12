import joblib
import re

from app.services.pdf_parser import extract_text_from_pdf

model = joblib.load(
    "trained_models/resume_classifier.pkl"
)

tfidf = joblib.load(
    "trained_models/tfidf_vectorizer.pkl"
)

label_encoder = joblib.load(
    "trained_models/label_encoder.pkl"
)

resume = extract_text_from_pdf(
    "sample_resumes/sample_resume.pdf"
)

text = resume["text"]

text = text.lower()
text = re.sub(r"[^a-zA-Z\s]", " ", text)
text = re.sub(r"\s+", " ", text)

vector = tfidf.transform([text])

prediction = model.predict(vector)

role = label_encoder.inverse_transform(prediction)

print("Predicted Category:", role[0])