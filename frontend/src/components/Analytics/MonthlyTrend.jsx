import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../../context/AuthContext';

const MonthlyTrend = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthly = async () => {
      const res = await fetch('http://localhost:8000/api/analytics/monthly', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json);
    };

    fetchMonthly();
  }, [token]);

  if (!data.length) return <p>No trend data yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-neutral-800">Monthly Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrend;
