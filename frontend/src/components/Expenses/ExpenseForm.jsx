import { useState } from 'react';

const defaultForm = {
  amount: '',
  category: '',
  description: '',
  expense_date: '',
};

const ExpenseForm = ({ onSubmit, initialData = null }) => {
  const [form, setForm] = useState(initialData || defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-md">
      <input
        name="amount"
        type="number"
        step="0.01"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="category"
        type="text"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="expense_date"
        type="date"
        value={form.expense_date}
        onChange={handleChange}
        className="w-full border p-2 rounded text-neutral-800"
        required
      />
      <input
        name="description"
        type="text"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {initialData ? 'Update' : 'Add'} Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
