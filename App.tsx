import React from "react";
import MetaTable from "./MetaTable";
import LoginForm from "./LoginForm";
import ApplicationBar from "./ApplicationBar";
import { useAuth } from "./AuthContext";

const App: React.FC = () => {
  const { token, handleLogin, handleLogout } = useAuth();

  return (
    <div>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <ApplicationBar onLogout={handleLogout}/>
          <MetaTable />
        </>
      )}
    </div>
  );
};

export default App;