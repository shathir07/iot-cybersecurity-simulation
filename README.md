IoT Cybersecurity Simulation

🚀 Overview
This project simulates IoT devices, attackers, and a cybersecurity system with **Rule-based + AI IDS**.  
The backend (Flask) detects suspicious activity, while the frontend (r) visualizes live logs, trends, and attack summaries.

🛠️ Features
- ✅ Normal IoT devices send simulated sensor data
- 🚨 Attackers flood server with abnormal/malicious requests
- 🛡️ Rule-based IDS detects abnormal ranges & DDoS
- 🤖 ML IDS (Isolation Forest) detects unknown anomalies
- 📊 React Dashboard shows:
  - Logs table
  - Temperature trend chart
  - Attack summary pie chart

## 📂 Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python server.py

cd dashboard
npm start 
./test.ps1   
