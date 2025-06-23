import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-full p-4">
      <nav className="space-y-3">
        <Link to="/dashboard" className="block font-medium text-blue-700">Dashboard</Link>
        <Link to="/analytics" className="block font-medium text-blue-700">Analytics</Link>
        <Link to="/expenses" className="block font-medium text-blue-700">Expenses</Link>
        <Link to="/budgets" className="block font-medium text-blue-700">
  Budgets
</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
