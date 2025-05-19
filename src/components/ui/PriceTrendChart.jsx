// src/components/PriceTrendChart.jsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const PriceTrendChart = ({ data }) => {
    return (
      <div className="bg-white rounded-lg p-4 shadow w-full max-w-4xl mt-4">
        <h2 className="text-lg font-semibold mb-4">가격 추이</h2>
        <ResponsiveContainer width="100%" height={240} minWidth={300}>
            <LineChart data={data} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    />
                <YAxis
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => `₩${v.toLocaleString()}`}
                />
                <Tooltip
                    isAnimationActive={false}
                    formatter={(value) => `₩${value.toLocaleString()}`}
                    contentStyle={{ fontSize: "12px", transition: "none" }}
                />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#0284C7"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PriceTrendChart;