import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AnalyticsCards = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch('http://localhost:8000/api/analytics/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSummary(data);
    };

    fetchSummary();
  }, [token]);

  if (!summary) return <p>Loading analytics...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-100 p-4 rounded shadow">
        <p className="text-sm text-blue-700">Total Spent</p>
        <p className="text-2xl font-bold text-blue-900">₦{summary.total.toFixed(2)}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <p className="text-sm text-green-700">Average Expense</p>
        <p className="text-2xl font-bold text-green-900">₦{summary.average.toFixed(2)}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <p className="text-sm text-yellow-700">Largest Single Expense</p>
        <p className="text-2xl font-bold text-yellow-900">₦{summary.max.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <p className="text-sm text-red-700">Total Entries</p>
        <p className="text-2xl font-bold text-red-900">you have a total of {summary.count} expense entries</p>
      </div>
    </div>
  );
};

export default AnalyticsCards;
