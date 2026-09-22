"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CustorSatisfaction({ rating }) {
  const ratingNumber =
    rating && rating.length > 0
      ? Number(rating[0]?.averageRating || 0).toFixed(2)
      : "0.00";

  const num = parseFloat(ratingNumber);

  const data = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [num, Math.max(0, 5 - num)],
        backgroundColor: ["#f59e0b", "#f1f5f9"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col items-center justify-between text-center">
      <h3 className="text-lg font-bold text-slate-800 self-start">
        Customers Satisfaction
      </h3>

      <div className="relative w-full max-w-[220px] aspect-[2/1] my-4 flex items-end justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className="text-xs text-slate-400 font-medium">Total Score</span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            <span className="text-amber-500">{ratingNumber}</span>{" "}
            <span className="text-sm font-normal text-slate-400">/ 5</span>
          </h1>
        </div>
      </div>

      <div className="w-full bg-amber-50/60 border border-amber-100 py-2.5 rounded-xl">
        <p className="text-xs text-amber-700 font-medium">
          Based on recent user ratings
        </p>
      </div>
    </div>
  );
}