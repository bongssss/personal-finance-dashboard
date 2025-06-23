import Layout from '../components/Layout/Layout';
import BudgetList from '../components/Budgets/BudgetList';

const BudgetsPage = () => (
  <Layout>
    <h2 className="text-2xl font-bold mb-4">Budgets</h2>
    <BudgetList />
  </Layout>
);

export default BudgetsPage;
