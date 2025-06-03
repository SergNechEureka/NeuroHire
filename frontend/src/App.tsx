import React from "react";
import CandidatesTable from "./components/CandidatesTable";
import CandidatePageLayout from "./components/CandidatePageLayout";
import useCandidates from "./hooks/useCandidates";
import LoginForm from "./LoginForm";
import ApplicationBar from "./ApplicationBar";
import { useAuth } from "./AuthContext";

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

  return (
    <div>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <ApplicationBar onLogout={handleLogout} />
          {selectedCandidate ? (
            <CandidatePageLayout
              candidate={selectedCandidate}
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
        </>
      )}
    </div>
  );
};

export default App;
