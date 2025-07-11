import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  // Utility function to style active link
  const getLinkClasses = (path) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition ${
      pathname === path
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        : 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-gray-700'
    }`;

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-800 h-full p-4 border-r border-gray-200 dark:border-gray-700">
      <nav className="space-y-2">
        <Link to="/dashboard" className={getLinkClasses('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/analytics" className={getLinkClasses('/analytics')}>
          Analytics
        </Link>
        <Link to="/expenses" className={getLinkClasses('/expenses')}>
          Expenses
        </Link>
        <Link to="/budgets" className={getLinkClasses('/budgets')}>
          Budgets
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
