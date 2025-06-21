import { useState } from 'react';
import LoginForm from '../components/Auth/LoginFrom';
import RegistrationForm from '../components/Auth/RegistrationForm';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-8">
      {isRegistering ? (
        <>
          <RegistrationForm
            onSubmit={async (data) => {
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
            }}
          />
          <button onClick={() => setIsRegistering(false)} className="mt-4 text-blue-600 underline">Already have an account?</button>
        </>
      ) : (
        <>
          <LoginForm onSubmit={handleLogin} />
          <button onClick={() => setIsRegistering(true)} className="mt-4 text-blue-600 underline">Create an account</button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
