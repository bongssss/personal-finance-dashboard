import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginFrom';
import RegistrationForm from '../components/Auth/RegistrationForm';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async (data) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Registration failed');
      setIsRegistering(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md px-8 py-10 space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100">
          {isRegistering ? 'Create Account' : 'Login'}
        </h2>

        {isRegistering ? (
          <RegistrationForm onSubmit={handleRegister} />
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="block text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
        >
          {isRegistering ? 'Already have an account?' : 'Create an account'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
