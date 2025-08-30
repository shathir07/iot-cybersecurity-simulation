import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from "recharts";

function App() {
  const [logs, setLogs] = useState([]);

  // Fetch logs from Flask API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs(); // initial fetch
    const interval = setInterval(fetchLogs, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Process Data for Attack Summary
  const attackSummary = [
    { name: "Normal", value: logs.filter(l => l.alert_type === "Normal").length },
    { name: "Rule-Based", value: logs.filter(l => l.alert_type === "Rule-Based").length },
    { name: "ML-Based", value: logs.filter(l => l.alert_type === "ML-Based").length },
  ];

  const COLORS = ["green", "orange", "red"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>IoT Cybersecurity Simulation</h1>

      {/* Logs Table */}
      <table border="1" cellPadding="8" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Alert Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.device_id}</td>
              <td>{log.temperature}</td>
              <td>{log.humidity}</td>
              <td>{log.alert_type}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Temperature Trend */}
      <h2>Temperature Trend</h2>
      <LineChart width={600} height={300} data={logs}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="blue" />
      </LineChart>

      {/* Attack Detection Summary */}
      <h2>Attack Detection Summary</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={attackSummary}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {attackSummary.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}

export default App;
