import React from 'react';
import LoginForm from './components/auth/LoginForm';
import ApplicationBar from './ApplicationBar';
import { useAuth, isTokenExpired } from './contexts/AuthContext';
import { AppRoutes } from './routes/appRoutes';

const App: React.FC = () => {
  const { token, handleLogin, handleLogout } = useAuth();

  if (!token || isTokenExpired(token)) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>
      <ApplicationBar onLogout={handleLogout} />
      <AppRoutes />
    </div>
  );
};

export default App;
