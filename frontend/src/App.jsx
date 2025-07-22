import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Expenses from './pages/Expenses';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import BudgetsPage from './pages/BudgetsPage';
import UpdateProfile from './pages/UpdateProfile';
import DeleteAccount from './pages/DeleteProfile';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute><Analytics /></ProtectedRoute>}
          />
          <Route
            path="/expenses"
            element={<ProtectedRoute><Expenses /></ProtectedRoute>}
          />
          <Route
            path="/"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
          path="/budgets"
          element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>}
          />
          <Route
          path="/profile/update"
          element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}
          />
          <Route
          path="/profile/delete"
          element={<ProtectedRoute><DeleteAccount /></ProtectedRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
