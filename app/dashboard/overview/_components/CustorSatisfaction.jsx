"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function customerSatisfaction({ rating }) {
  // Data for the Doughnut Chart
  const ratingNumber = rating[0].averageRating.toFixed(2);

  const data = {
    labels: ["Score", "Remaining"], 
    datasets: [
      {
        data: [ratingNumber, 5 - ratingNumber], 
        backgroundColor: ["orange", "#F0F0F0"], 
        borderWidth: 0,
      },
    ],
  };

  
  const options = {
    rotation: -90, 
    circumference: 180, 
    cutout: `${ratingNumber * 20}`, 
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: false, 
      },
    },
  };

  return (
    <>
      <div className=" bg-white shadow-md p-4 text-center">
      <h3 className="text-xl text-pink-700 font-semibold">
        Customers Satisfaction
      </h3>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "relative",
          top: "-130px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#4F82E9",
        }}
      >
        {ratingNumber}/5
      </div>
    </div>
    </>
  );
}
