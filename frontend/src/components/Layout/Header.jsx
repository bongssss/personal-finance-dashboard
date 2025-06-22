import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
};

export default Header;
