import React from "react";

function LogsTable({ logs }) {
  return (
    <table className="border w-full mt-4">
      <thead>
        <tr>
          <th>Device ID</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Alert</th>
          <th>Type</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, idx) => (
          <tr key={idx}>
            <td>{log.device_id}</td>
            <td>{log.temperature.toFixed(2)}</td>
            <td>{log.humidity.toFixed(2)}</td>
            <td className={log.alert !== "Normal" ? "text-red-500" : "text-green-500"}>
              {log.alert}
            </td>
            <td>{log.alert_type}</td>
            <td>{log.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LogsTable;
