# backend/model.py
import numpy as np
from sklearn.ensemble import IsolationForest
import pickle

# Generate synthetic "normal" IoT device data
# Features: [temperature, humidity]
np.random.seed(42)
normal_temp = np.random.normal(25, 2, 500)      # around 25°C
normal_humid = np.random.normal(50, 5, 500)     # around 50% humidity

X_normal = np.column_stack((normal_temp, normal_humid))

# Train Isolation Forest model
model = IsolationForest(contamination=0.05, random_state=42)
model.fit(X_normal)

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as model.pkl")
