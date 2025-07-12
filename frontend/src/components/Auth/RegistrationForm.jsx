import { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      

      <input
        type="text"
        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-900 text-sm"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="email"
        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-900 text-sm"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-900 text-sm"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
