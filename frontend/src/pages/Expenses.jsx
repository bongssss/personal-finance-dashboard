import Layout from '../components/Layout/Layout';
import ExpenseList from '../components/Expenses/ExpenseList';

const Expenses = () => (
  <Layout>
    <h2 className="text-2xl font-bold mb-4">Expenses</h2>
    <ExpenseList />
  </Layout>
);

export default Expenses;
