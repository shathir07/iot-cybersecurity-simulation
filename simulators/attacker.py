import requests, random, time

SERVER_URL = "http://127.0.0.1:5000/data"
DEVICE_ID = "attacker-1"

while True:
    data = {
        "device_id": DEVICE_ID,
        "temperature": random.uniform(-100, 200),  # abnormal values
        "humidity": random.uniform(0, 200)
    }
    try:
        r = requests.post(SERVER_URL, json=data)
        print("🚨 Attack:", data, "| Response:", r.json())
    except Exception as e:
        print("Error:", e)
    time.sleep(0.05)  # flood requests
