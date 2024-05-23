import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  year: number;
  eventData: number[];
  challengeData: number[];
}

const BarChart: React.FC<BarChartProps> = ({ year, eventData, challengeData }) => {
  const data = {
    labels: Array.from({ length: 12 }, (_, i) => new Date(year, i).toLocaleString('default', { month: 'short' })),
    datasets: [
      {
        label: 'Events',
        data: eventData,
        backgroundColor: '#E16F3D',
      },
      {
        label: 'Challenges',
        data: challengeData,
        backgroundColor: '#015BBB',
      }
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        // ticks: {
        //   callback: function(value: any) {
        //     if (Number.isInteger(value)) {
        //       return value.toString();
        //     }
        //   }
        // }
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: `Monthly Events and Challenges (${year})`,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
