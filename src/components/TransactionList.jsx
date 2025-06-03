import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardContent } from '@/components/ui/card';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/transactions').then((res) => {
      setTransactions(res.data);
    });
  }, []);

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Transactions</h2>
      {transactions.map((tx) => (
        <Card key={tx.id}>
          <CardContent className="p-4 flex justify-between">
            <div>{tx.description}</div>
            <div className={tx.amount < 0 ? 'text-red-500' : 'text-green-600'}>
              ${tx.amount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionList;
