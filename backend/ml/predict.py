from pathlib import Path
import joblib

BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(
    BASE_DIR / "models" / "job_scam_detector.pkl"
)


def predict_job(text):
    prediction = model.predict([text])[0]
    probability = model.predict_proba([text])[0][1]

    return {
        "prediction": int(prediction),
        "confidence": round(probability * 100, 2)
    }