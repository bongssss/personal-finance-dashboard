import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import { API_URL } from '../services/api';

const ExpenseList = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    const res = await fetch(`${API_URL}/api/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setExpenses(data);
  };

  const handleSubmit = async (data) => {
    const url = editing
      ? `${API_URL}/api/expenses/${editing.id}`
      : `${API_URL}api/expenses`;

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
      await fetchExpenses();
      setEditing(null);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/expenses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="space-y-6">
      <ExpenseForm onSubmit={handleSubmit} initialData={editing} />
      <div className="space-y-4">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
