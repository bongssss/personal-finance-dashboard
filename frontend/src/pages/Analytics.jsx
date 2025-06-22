import Layout from '../components/Layout/Layout';
//import CategoryPie from '../components/Analytics/CategoryPie';
//import MonthlyTrend from '../components/Analytics/MonthlyTrend';
import AnalyticsCards from '../components/Analytics/AnalyticsCards';

const AnalyticsPage = () => (
  <Layout>
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnalyticsCards />
    </div>
  </Layout>
);

export default AnalyticsPage;
