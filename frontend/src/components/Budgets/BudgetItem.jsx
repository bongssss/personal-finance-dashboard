const BudgetItem = ({ budget, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-sm text-neutral-800">
      <div>
        <p className="font-bold">{budget.category}</p>
        <p className="text-sm text-gray-600">Month: {budget.month}</p>
        <p className="text-sm text-gray-600">Amount: ₦{budget.amount.toFixed(2)}</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(budget)} className="px-3 py-1 bg-yellow-400 text-white rounded">
          Edit
        </button>
        <button onClick={() => onDelete(budget.id)} className="px-3 py-1 bg-red-600 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetItem;
