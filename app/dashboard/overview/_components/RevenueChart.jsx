'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Revenue Line Chart',
    },
    tooltip:{
      backgroundColor: 'rgb(155,32,99)'
    }
  },
};


export default function RevenueChart ({revenueData}) {
  
  const labels = revenueData.map((data)=>data.monthName);

  const data = {
    labels,
    datasets: [
      {
        label: 'revenue',
        data: revenueData.map((revenue) => `${revenue.totalRevenue}`),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        hoverBackgroundColor:'rgb(16,65,99)',
        tension:0.5
      },
    ],
  };
  
  return (
    <>
      <Line options={options} data={data} />
 
    </>
  );
}
