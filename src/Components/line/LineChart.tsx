'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface LineChartProps {
  data: number[];
  label: string;
  color: string;
  labelColor: string; 
}

export const LineChart: React.FC<LineChartProps> = ({ data, label, color, labelColor = 'white' }) => {
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1), // Muestra números en el eje X
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color, // Color de la línea
        backgroundColor: `${color}33`, // Color de fondo con opacidad
        tension: 0.4, // Suaviza las líneas
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: labelColor, // Aplica el color del label
          font: {
            size: 23, // Aumenta el tamaño del texto del label
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};