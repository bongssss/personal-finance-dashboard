import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || user?.email}!</h1>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
