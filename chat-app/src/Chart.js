import React from 'react';
import { Bar } from 'react-chartjs-2';

function Chart({ dataValues }) {
  const data = {
    labels: ['a', 'b', 'c', 'd'],
    datasets: [
      {
        label: 'Values',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // ... (rest of the Chart component)

  return <Bar data={data}/>;
}

export default Chart;
