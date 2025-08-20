import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import {API_URL} from '../services/api'

const UpdateProfile = () => {
  const { user, token, setUser } = useAuth(); // make sure setUser exists in context
  const [form, setForm] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}api/auth/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Update failed');

      //refetch latest user
      const fresh = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      setUser(fresh);

      toast.success('Profile updated');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded dark:bg-gray-900" placeholder="Name" required />
        <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded dark:bg-gray-900" placeholder="Email" required />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
