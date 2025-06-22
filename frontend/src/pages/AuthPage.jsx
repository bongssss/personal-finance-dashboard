import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginFrom'
import RegistrationForm from '../components/Auth/RegistrationForm';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // 👈 Needed for redirect

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate('/'); // 👈 Redirect to dashboard after login
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
      setIsRegistering(false); // 👈 Return to login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8">
      {isRegistering ? (
        <>
          <RegistrationForm onSubmit={handleRegister} />
          <button
            onClick={() => setIsRegistering(false)}
            className="mt-4 text-blue-600 underline"
          >
            Already have an account?
          </button>
        </>
      ) : (
        <>
          <LoginForm onSubmit={handleLogin} />
          <button
            onClick={() => setIsRegistering(true)}
            className="mt-4 text-blue-600 underline"
          >
            Create an account
          </button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
