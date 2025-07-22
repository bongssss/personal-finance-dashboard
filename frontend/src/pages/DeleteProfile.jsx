import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/UI/ConfirmationModal';

const DeleteAccount = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const deleteUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/me', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Account deleted');
      logout();
      navigate('/auth');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Delete Account</h2>
      <p className="text-sm mb-8">This action is <strong>irreversible</strong>. All data will be lost.</p>
      <button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded">
        Delete my account
      </button>

      <ConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={deleteUser}
        title="Confirm deletion"
      >
        Are you absolutely sure? This cannot be undone.
      </ConfirmModal>
    </div>
  );
};

export default DeleteAccount;
