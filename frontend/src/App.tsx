import React from 'react';
import LoginForm from './components/auth/LoginForm';
import ApplicationBar from './ApplicationBar';
import { useAuth, isTokenExpired } from './contexts/AuthContext';
import { MainPage } from './components/MainPage';

const App: React.FC = () => {
  const { token, handleLogin, handleLogout } = useAuth();

  if (!token || isTokenExpired(token)) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>
      <ApplicationBar onLogout={handleLogout} />
      <MainPage showHeader={false}>{null}</MainPage>
    </div>
  );
};

export default App;
