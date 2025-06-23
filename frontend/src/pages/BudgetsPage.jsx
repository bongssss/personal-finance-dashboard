import BudgetList from '../components/Budgets/BudgetList';
import BudgetSummary from '../components/Budgets/BudgetSummary';
import Layout from '../components/Layout/Layout';

const BudgetsPage = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Budgets</h2>
      <BudgetSummary month={currentMonth} />
      <div className="mt-8">
        <BudgetList />
      </div>
    </Layout>
  );
};

export default BudgetsPage;
