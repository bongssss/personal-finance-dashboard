import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    }
    fetchTransactions();
  }, []);

  return (
  <div>
    <h3 className="text-xl font-semibold mb-2">Transactions</h3>
    <pre className="bg-blue-100 p-4 rounded font-mono">
      {transactions.map((txn) => {
        const date = new Date(txn.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        const sign = txn.amount < 0 ? '-' : '';
        const amount = `$${Math.abs(txn.amount).toFixed(2)}`;

        return `${txn.description.padEnd(20)} | ${sign}${amount.padStart(8)} | ${date}\n`;
      })}
    </pre>
  </div>
);
}