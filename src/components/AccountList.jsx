import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
  async function fetchAccounts() {
    try {
      const res = await api.get('/accounts');
      console.log('✅ Accounts response:', res.data); // Add this
      setAccounts(res.data);
    } catch (err) {
      console.error(' Error fetching accounts:', err.response || err);
    }
  }
  fetchAccounts();
}, []);


  return (
  <div>
    <h3 className="text-xl font-semibold mb-2">Accounts</h3>
    <pre className="bg-green-100 p-4 rounded font-mono">
      {accounts.map((acc) => (
        `${acc.name.padEnd(15)} - $${acc.balance.toFixed(2)}\n`
      ))}
    </pre>
  </div>
);
}
