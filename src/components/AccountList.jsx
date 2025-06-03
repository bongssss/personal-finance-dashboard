import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardContent } from '@/components/ui/card';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    api.get('/accounts').then((res) => {
      setAccounts(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Accounts</h2>
      {accounts.map((acc) => (
        <Card key={acc.id}>
          <CardContent className="p-4">
            <div className="font-medium">{acc.name}</div>
            <div className="text-gray-600">${acc.balance.toFixed(2)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountList;
