import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function QuoteChart({ symbol }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d2dl781r01qi5pq6649gd2dl781r01qi5pq664a0`
      );
      const data = await res.json();

      setChartData({
        labels: ["Open", "Current", "High", "Low", "Prev Close"],
        datasets: [
          {
            label: "Quote Values", // ✅ fixes undefined issue
            data: [data.o, data.c, data.h, data.l, data.pc],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)", // Open
              "rgba(75, 192, 192, 0.7)", // Current
              "rgba(255, 99, 132, 0.7)", // High
              "rgba(255, 206, 86, 0.7)", // Low
              "rgba(153, 102, 255, 0.7)", // Prev Close
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, [symbol]);

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: false, // ✅ hides "undefined button"
              },
              title: {
                display: true,
                text: `Stock Quote Data for ${symbol}`, // ✅ title
              },
            },
          }}
          height={300}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default QuoteChart;
