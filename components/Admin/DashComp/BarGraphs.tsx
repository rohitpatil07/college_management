import React from 'react'
import "chart.js/auto";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import { Bar } from 'react-chartjs-2';
const BarGraphs = (datas:any) => {
    const option = {
        responsive: true,
        
        maintainAspectRatio:false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: datas.label,
          },
        },
      };
    const data = {
        labels: datas.labels,
        datasets: [
          {
            data: datas.datas,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
  return (
    <div className='w-6/12 min-h-[500px]'><Bar data={data} options={option}/></div>
  )
}

export default BarGraphs