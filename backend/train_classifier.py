import pandas as pd
import re
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

from xgboost import XGBClassifier


# ---------------------
# Load Dataset
# ---------------------

df = pd.read_csv("../datasets/raw/ResumeDataSet.csv")

# ---------------------
# Clean Text
# ---------------------

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", " ", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()


df["clean_resume"] = df["Resume"].apply(clean_text)

# ---------------------
# Encode Labels
# ---------------------

label_encoder = LabelEncoder()

y = label_encoder.fit_transform(df["Category"])

# ---------------------
# TF-IDF
# ---------------------

tfidf = TfidfVectorizer(
    max_features=10000,
    stop_words="english",
    ngram_range=(1,2)
)

X = tfidf.fit_transform(df["clean_resume"])

# ---------------------
# Train Test Split
# ---------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ---------------------
# XGBoost Model
# ---------------------

model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    random_state=42
)

model.fit(X_train, y_train)

# ---------------------
# Evaluation
# ---------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# ---------------------
# Save Model
# ---------------------

joblib.dump(
    model,
    "trained_models/resume_classifier.pkl"
)

joblib.dump(
    tfidf,
    "trained_models/tfidf_vectorizer.pkl"
)

joblib.dump(
    label_encoder,
    "trained_models/label_encoder.pkl"
)

print("\nModel Saved Successfully")