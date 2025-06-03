// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api, { setAuthToken } from '../lib/api';
// import qs from 'qs'; // install with `npm install qs`

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     // Try sending as JSON instead of form-urlencoded
//     const res = await api.post('/login', {
//       email: email,  // Changed from username to email
//       password: password,
//     });

//     // Verify the exact token field name in response
//     console.log('Full response:', res.data);  // Debugging
    
//     const token = res.data.access_token;
//     if (!token) {
//       throw new Error('No token received');
//     }
    
//     setAuthToken(token);
//     localStorage.setItem('token', token);
//     navigate('/dashboard');
//   } catch (err) {
//     console.error('Login error:', err.response?.data || err.message);
//     setError(err.response?.data?.detail || 'Invalid credentials');
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
//       <h2 className="text-xl mb-4">Login</h2>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       <input
//         type="text"
//         name='username'
//         placeholder="Username or Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="border p-2 mb-4 w-full"
//       />
//       <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
//         Log In
//       </button>
//     </form>
//   );
// }
