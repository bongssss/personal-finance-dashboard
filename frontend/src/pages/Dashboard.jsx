import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Welcome, {user?.name || user?.email}!</h2>
      <p className="mt-2 text-gray-600">This is your dashboard.</p>
    </Layout>
  );
};

export default Dashboard;
