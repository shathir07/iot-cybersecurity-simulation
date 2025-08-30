# test.ps1
Write-Host "🚀 Sending IoT test requests..." -ForegroundColor Cyan

# Normal request (should be Normal)
Invoke-RestMethod -Uri "http://127.0.0.1:5000/data" -Method Post -Headers @{ "Content-Type"="application/json" } -Body '{"device_id":"device1","temperature":25,"humidity":50}'

# Suspicious high temperature (rule-based alert)
Invoke-RestMethod -Uri "http://127.0.0.1:5000/data" -Method Post -Headers @{ "Content-Type"="application/json" } -Body '{"device_id":"device1","temperature":70,"humidity":50}'

# Suspicious low temperature (rule-based alert)
Invoke-RestMethod -Uri "http://127.0.0.1:5000/data" -Method Post -Headers @{ "Content-Type"="application/json" } -Body '{"device_id":"device2","temperature":-30,"humidity":40}'

# ML anomaly (weird humidity, still within temp range)
Invoke-RestMethod -Uri "http://127.0.0.1:5000/data" -Method Post -Headers @{ "Content-Type"="application/json" } -Body '{"device_id":"device3","temperature":26,"humidity":99}'

# DDoS simulation (same device spamming quickly)
for ($i=0; $i -lt 25; $i++) {
    Invoke-RestMethod -Uri "http://127.0.0.1:5000/data" -Method Post -Headers @{ "Content-Type" = "application/json" } -Body '{"device_id":"attacker","temperature":25,"humidity":50}' | Out-Null
}
Write-Host "✅ Sent 25 rapid requests from attacker (should trigger DDoS alert)" -ForegroundColor Yellow

# Show all logs after test
Write-Host "`nFetching logs..." -ForegroundColor Green
Invoke-RestMethod -Uri "http://127.0.0.1:5000/logs" -Method Get


