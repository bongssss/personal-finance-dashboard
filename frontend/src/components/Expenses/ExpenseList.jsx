import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    const res = await fetch('http://localhost:8000/api/expenses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setExpenses(data);
  };

  const handleSubmit = async (data) => {
    const url = editing
      ? `http://localhost:8000/api/expenses/${editing.id}`
      : 'http://localhost:8000/api/expenses';

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
    await fetch(`http://localhost:8000/api/expenses/${id}`, {
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
