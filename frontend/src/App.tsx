import React from "react";
import CandidatesTable from "./components/CandidatesTable";
import useCandidates from "./hooks/useCandidates";
import LoginForm from "./LoginForm";
import ApplicationBar from "./ApplicationBar";
import { useAuth } from "./AuthContext";

const App: React.FC = () => {
  const { token, handleLogin, handleLogout } = useAuth();

  const {
    candidates,
    selectedIds,
    onSelect,
    onSelectAll,
    onDeselectAll,
    onDelete,
    onDeleteOne,
    fetchData
  } = useCandidates();

  return (
    <div>
      {!token ? (
        <LoginForm 
            onLogin={handleLogin} />
      ) : (
        <>
          <ApplicationBar 
            onLogout={handleLogout}/>
          <CandidatesTable 
            candidates={candidates}
            selectedIds={selectedIds}
            onSelect={onSelect}
            onSelectAll={onSelectAll}
            onDeselectAll={onDeselectAll}
            onDelete={onDelete}
            onDeleteOne={onDeleteOne}
            onRowClick={console.log}
            loading={false}
            fetchData={fetchData}
          />
        </>
      )}
    </div>
  );
};

export default App;