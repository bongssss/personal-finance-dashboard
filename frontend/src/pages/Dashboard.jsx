import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import ExpenseList from '../components/Expenses/ExpenseList';
import AnalyticsCards from '../components/Analytics/AnalyticsCards';
import CategoryPie from '../components/Analytics/CategoryPie';
import MonthlyTrend from '../components/Analytics/MonthlyTrend';



const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Welcome, {user?.name || user?.email}!</h2>
      <p className="mt-2 text-gray-600">This is your dashboard.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  <CategoryPie />
  <MonthlyTrend />
</div>
     <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
     <ExpenseList />
     <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <AnalyticsCards />
      
    </Layout>
  );
};

export default Dashboard;
