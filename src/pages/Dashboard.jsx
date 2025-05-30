import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Expenses',
      data: [500, 800, 400, 700, 600],
      backgroundColor: '#3b82f6',
    },
    {
      label: 'Income',
      data: [1000, 1200, 900, 1100, 1000],
      backgroundColor: '#10b981',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
