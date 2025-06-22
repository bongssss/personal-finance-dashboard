const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 border rounded shadow-sm">
      <div>
        <p className="font-semibold text-lg">${expense.amount.toFixed(2)}</p>
        <p className="text-sm text-gray-600">{expense.category} – {expense.description}</p>
        <p className="text-xs text-gray-400">{expense.expense_date}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(expense)}
          className="px-3 py-1 bg-yellow-400 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
