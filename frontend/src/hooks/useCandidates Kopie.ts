import { useEffect, useState, useCallback } from "react";
import type { Candidate } from "../types/models";
import { fetchCandidates, deleteCandidates, deleteCandidate } from "../api/candidates";
import { useAuth } from "../AuthContext";

export default function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchData = useCallback(() => {
      setLoading(true);
      fetchCandidates().then(setCandidates).finally(() => setLoading(false));
    },
    []
  );

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token, fetchData]);

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
      );
    },
    []
  );

  const handleSelectAll = useCallback(() => {
    setSelectedIds(candidates.map((c) => c.candidate_id));
  }, [candidates]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleDelete = useCallback(
    async (ids: string[]) => {
      await deleteCandidates(ids);
      setCandidates((prev) => prev.filter((c) => !ids.includes(c.candidate_id)));
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
      fetchData();
    },
    []
  );

  const handleDeleteOne = useCallback( 
    async (id: string) => {
      await deleteCandidate(id);
      setSelected(selected.filter(id => id !== id));
      fetchData();
    },
    []
  );

  const handleRowClick = useCallback((candidate: Candidate) => {
    console.log("This row was clicked:", candidate.candidate_id);
  }, []);

  return {
    candidates,
    selectedIds,
    handleSelect,
    handleSelectAll,
    handleDeselectAll,
    handleDelete,
    setCandidates,
    setSelectedIds,
    loading,
    setLoading,
    handleDeleteOne,
    fetchData,
    handleRowClick
  };
}