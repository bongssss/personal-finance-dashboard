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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="space-y-4 text-center">
        {isRegistering ? (
          <>
            <RegistrationForm onSubmit={handleRegister} />
            <button
              onClick={() => setIsRegistering(false)}
              className="text-sm text-blue-600 dark:text-blue-400 underline"
            >
              Already have an account?
            </button>
          </>
        ) : (
          <>
            <LoginForm onSubmit={handleLogin} />
            <button
              onClick={() => setIsRegistering(true)}
              className="text-sm text-blue-600 dark:text-blue-400 underline"
            >
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
