import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

# Load dataset
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

df = pd.read_csv(BASE_DIR / "dataset" / "fake_job_postings.csv")

# Fill missing values
df = df.fillna("")

# Combine useful text columns
df["text"] = (
    df["title"] + " " +
    df["description"] + " " +
    df["requirements"]
)

X = df["text"]
y = df["fraudulent"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create ML pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english", max_features=5000)),
    ("classifier", LogisticRegression(max_iter=1000))
])

# Train
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))

# Save model
joblib.dump(
    model,
    BASE_DIR / "models" / "job_scam_detector.pkl"
)
print("Model saved successfully.")