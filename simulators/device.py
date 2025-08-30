import requests, random, time

SERVER_URL = "http://127.0.0.1:5000/data"
DEVICE_ID = "device-1"

while True:
    data = {
        "device_id": DEVICE_ID,
        "temperature": random.uniform(20, 30),
        "humidity": random.uniform(40, 60)
    }
    try:
        r = requests.post(SERVER_URL, json=data)
        print("✅ Sent:", data, "| Response:", r.json())
    except Exception as e:
        print("Error:", e)
    time.sleep(2)  # normal device sends every 2 sec
