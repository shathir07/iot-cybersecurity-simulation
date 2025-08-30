from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from collections import defaultdict
import numpy as np
import pickle   # <-- new (for loading model.pkl)


app = Flask(__name__)
CORS(app)  # ✅ allow frontend access

logs = []
device_requests = defaultdict(list)

# Load trained Isolation Forest model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)


@app.route("/data", methods=["POST"])
def receive_data():
    data = request.get_json()
    device_id = data.get("device_id", "unknown")
    timestamp = datetime.now().isoformat()
    data["timestamp"] = timestamp

    alert = "Normal"
    alert_type = "Normal"

    # Rule 1: abnormal sensor values
    if data["temperature"] < -20 or data["temperature"] > 60:
        alert = "Suspicious temperature values"
        alert_type = "Rule-Based"

    # Rule 2: DDoS detection (too many requests in 10s window)
    now = datetime.now().timestamp()
    device_requests[device_id].append(now)
    device_requests[device_id] = [t for t in device_requests[device_id] if now - t <= 10]
    if len(device_requests[device_id]) >= 20:
        alert = "Possible DDoS attack"
        alert_type = "Rule-Based"

    # ML anomaly detection
    X_test = np.array([[data["temperature"], data["humidity"]]])
    prediction = model.predict(X_test)
    if prediction[0] == -1:
        alert = "ML Anomaly Detected"
        alert_type = "ML-Based"

    data["alert"] = alert
    data["alert_type"] = alert_type
    logs.append(data)

    return jsonify({"status": "received", "alert": alert})

@app.route("/logs", methods=["GET"])
def get_logs():
    return jsonify(logs)

if __name__ == "__main__":
    # Expose on all network interfaces (for React at 3000 or LAN access)
    app.run(host="0.0.0.0", port=5000, debug=True)
