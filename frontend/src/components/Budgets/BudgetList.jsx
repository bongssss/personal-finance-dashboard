import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BudgetForm from './BudgetForm';
import BudgetItem from './BudgetItem';
import { API_URL } from '../services/api';

const BudgetList = () => {
  const { token } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchBudgets = async () => {
    const res = await fetch('http://localhost:8000/api/budgets', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setBudgets(json);
  };

  const handleSubmit = async (data) => {
    const url = editing
      ? `http://localhost:8000/api/budgets/${editing.id}`
      : 'http://localhost:8000/api/budgets';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setEditing(null);
      fetchBudgets();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/budgets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="space-y-6">
      <BudgetForm onSubmit={handleSubmit} initialData={editing} />
      <div className="space-y-4">
        {budgets.map((b) => (
          <BudgetItem key={b.id} budget={b} onEdit={setEditing} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
