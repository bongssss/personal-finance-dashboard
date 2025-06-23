import { useState } from 'react';

const initial = { category: '', amount: '', month: '' };

const BudgetForm = ({ onSubmit, initialData = null }) => {
  const [form, setForm] = useState(initialData || initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!initialData) setForm(initial);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-md">
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        step="0.01"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="month"
        name="month"
        value={form.month}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
        {initialData ? 'Update' : 'Add'} Budget
      </button>
    </form>
  );
};

export default BudgetForm;
