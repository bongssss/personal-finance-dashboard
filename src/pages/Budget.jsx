import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const initialCategories = [
  { name: 'Housing', budget: 1000, spent: 800 },
  { name: 'Food', budget: 500, spent: 450 },
  { name: 'Transport', budget: 300, spent: 200 },
  { name: 'Entertainment', budget: 200, spent: 180 },
];

export default function Budget() {
  const [categories, setCategories] = useState(initialCategories);

  const totalBudget = categories.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = categories.reduce((acc, c) => acc + c.spent, 0);

  const chartData = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        data: categories.map(c => c.spent),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl text-gray-500 font-bold mb-4">💸 Budget Overview</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Budget</p>
          <p className="text-2xl text-blue-500 font-bold">${totalBudget}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-red-500">${totalSpent}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Remaining</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalBudget - totalSpent}
          </p>
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white p-4 rounded shadow w-full md:w-1/2 mx-auto mb-8">
        <Doughnut data={chartData} />
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Spending Details</h3>
        <table className="w-full text-left">
          <thead className="text-sm text-gray-500 border-b">
            <tr>
              <th className="py-2">Category</th>
              <th>Budgeted</th>
              <th>Spent</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.name} className="text-sm border-b">
                <td className="py-2">{cat.name}</td>
                <td>${cat.budget}</td>
                <td>${cat.spent}</td>
                <td>${cat.budget - cat.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
