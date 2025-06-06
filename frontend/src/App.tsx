import React from "react";
import CandidatesTable from "./components/CandidatesTable";
import CandidatePageLayout from "./components/CandidatePageLayout";
import useCandidates from "./hooks/useCandidates";
import LoginForm from "./components/auth/LoginForm";
import ApplicationBar from "./ApplicationBar";
import { useAuth, isTokenExpired } from "./AuthContext";

const App: React.FC = () => {
  const { token, handleLogin, handleLogout } = useAuth();

  const {
    candidates,
    selectedIds,
    order,
    orderBy,
    handleSelect,
    handleSelectAll,
    handleDelete,
    handleDeleteOne,
    handleRowClick,
    fetchData,
    getComparator,
    handleRequestSort,
    selectedCandidate,
    setSelectedCandidate,
  } = useCandidates();

  // Показываем только LoginForm, если токен отсутствует или истёк
  if (!token || isTokenExpired(token)) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>
      <ApplicationBar onLogout={handleLogout} />
      {selectedCandidate ? (
        <CandidatePageLayout
          candidates={candidates}
          selectedCandidate={selectedCandidate}
          onBack={() => setSelectedCandidate(null)}
        />
      ) : (
        <CandidatesTable
          candidates={candidates}
          selectedIds={selectedIds}
          order={order}
          orderBy={orderBy}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleDelete={handleDelete}
          handleDeleteOne={handleDeleteOne}
          handleRowClick={handleRowClick}
          loading={false}
          fetchData={fetchData}
          getComparator={getComparator}
          handleRequestSort={handleRequestSort}
        />
      )}
    </div>
  );
};

export default App;
