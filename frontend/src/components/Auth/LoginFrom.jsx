import { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
     <div className="bg-red-500 text-white p-4">Test Style</div>

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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
