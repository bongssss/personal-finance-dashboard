import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!confirm('Are you absolutely sure? This cannot be undone.')) return;

    try {
      const res = await fetch('http://localhost:8000/api/auth/me', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Delete failed');
      logout(); // clears auth context
      navigate('/auth'); // redirect to login
    } catch (err) {
      alert('Error deleting account: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Delete Account</h2>
      <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">
        This action is <strong>irreversible</strong>. All your data will be permanently deleted.
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteAccount;
