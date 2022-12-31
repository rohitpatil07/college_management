import React from "react";
import "chart.js/auto";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Pie } from "react-chartjs-2";
const PieCharts = (datas: any) => {
	const options = {
		responsive: true,

		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
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
				label: datas.labels,
				data: datas.datas,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<div className="w-10/12 md:w-2/3 m-auto xl:w-2/5 min-h-[500px]">
			<Pie data={data} options={options} />
		</div>
	);
};

export default PieCharts;
