import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        💸 Expense Tracker
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={logout}
          className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
