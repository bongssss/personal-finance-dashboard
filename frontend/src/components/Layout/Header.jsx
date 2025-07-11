import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        💸 Expense Tracker
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
       
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
