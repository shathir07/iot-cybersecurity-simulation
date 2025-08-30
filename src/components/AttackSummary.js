import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function AttackSummary({ logs }) {
  const counts = { Normal: 0, "Rule-Based": 0, "ML-Based": 0 };
  logs.forEach((log) => {
    counts[log.alert_type] = (counts[log.alert_type] || 0) + 1;
  });

  const data = [
    { name: "Normal", value: counts.Normal },
    { name: "Rule-Based", value: counts["Rule-Based"] },
    { name: "ML-Based", value: counts["ML-Based"] },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#f44336"];

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Attack Detection Summary</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default AttackSummary;
