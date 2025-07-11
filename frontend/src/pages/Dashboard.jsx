import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
//import ExpenseList from '../components/Expenses/ExpenseList';
//import AnalyticsCards from '../components/Analytics/AnalyticsCards';
import CategoryPie from '../components/Analytics/CategoryPie';
import MonthlyTrend from '../components/Analytics/MonthlyTrend';



const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-6"></div>
      <h2 className="text-2xl font-bold">Welcome, {user?.name || user?.email}!</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">This is a dashboard of your expenses over the last month.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
     
  <CategoryPie />
</div>  
<div className="bg-white dark:bg-gray-800 p-6 rounded shadow">

  <MonthlyTrend />
</div>

    </Layout>
  );
};

export default Dashboard;
