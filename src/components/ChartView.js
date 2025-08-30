import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ChartView({ logs }) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Temperature Trend</h2>
      <LineChart width={600} height={300} data={logs.slice(-20)}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default ChartView;
