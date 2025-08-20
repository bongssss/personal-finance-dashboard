import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../services/api';

const BudgetSummary = ({ month }) => {
  const { token } = useAuth();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch(`${API_URL}/api/budgets/summary?month=${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("📊 Budget Summary Response:", data); 
      setSummary(data);
    };

    fetchSummary();
  }, [month, token]);

  if (!summary.length) return <p className="text-gray-500">No budgets set for this month.</p>;

  return (
    <div className="space-y-4">
      {summary.map((item) => {
        const category = item.category || 'Unknown';
        const budget = Number(item.budget ?? 0);
        const actual = Number(item.actual ?? 0);
        const percent = budget > 0 ? Math.min((actual / budget) * 100, 100) : 0;
        const over = actual > budget;

        return (
          <div key={category} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{category}</span>
              <span className={`text-sm ${over ? 'text-red-600' : 'text-gray-600'}`}>
                ₦{actual.toFixed(2)} / ₦{budget.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${over ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetSummary;
