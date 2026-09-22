"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);


const ALL_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function RevenueChart({ revenueData = [] }) {
  
  const formattedData = ALL_MONTHS.map((month) => {
    const found = revenueData?.find(
      (item) => item.monthName?.toLowerCase().startsWith(month.toLowerCase())
    );
    return found ? found.totalRevenue : 0;
  });

  const data = {
    labels: ALL_MONTHS, 
    datasets: [
      {
        data: formattedData,
        backgroundColor: "#2563eb", 
        borderRadius: 20,
        borderSkipped: false,
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `Revenue: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        grid: { color: "#f1f5f9" },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col justify-between">
      <div className="h-[280px] w-full">
        <h3 className="text-blue-950 font-semibold">Revenue Chart</h3>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}