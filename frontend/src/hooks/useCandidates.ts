import * as React from "react";
import type { Candidate } from "../types/models";
import { fetchCandidates, deleteCandidates, deleteCandidate } from "../api/candidates";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import type { Order } from "../types/common";

export default function useCandidates() {
  const [candidates, setCandidates] = React.useState<Candidate[]>([]);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Candidate>('candidate_name');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  }, []);

  function getComparator<Key extends keyof Candidate>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string | null | undefined },
    b: { [key in Key]: number | string | null | undefined },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  React.useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token, fetchData]);

  const handleSelect = React.useCallback(
    (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
      );
    },
    []
  );

  const handleDelete = React.useCallback(
    async (ids: string[]) => {
      try {
        setError(null);
        await deleteCandidates(ids);
        setCandidates((prev) => prev.filter((c) => !ids.includes(c.candidate_id)));
        setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
        await fetchData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete candidates');
      }
    },
    [fetchData]
  );

  const handleDeleteOne = React.useCallback( 
    async (id: string) => {
      try {
        setError(null);
        await deleteCandidate(id);
        setSelectedIds(prev => prev.filter(sid => sid !== id));
        await fetchData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete candidate');
      }
    },
    [fetchData]
  );

  const handleRowClick = React.useCallback((candidate: Candidate) => {
    navigate(`/candidates/${candidate.candidate_id}`);
  }, [navigate]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(candidates.map((n) => n.candidate_id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Candidate,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return {
    candidates,
    error,
    fetchData,
    getComparator,
    handleDelete,
    handleDeleteOne,
    handleRequestSort,
    handleRowClick,
    handleSelect,
    handleSelectAll,
    loading,
    order,
    orderBy,
    selectedCandidate,
    selectedIds,
    setCandidates,
    setLoading,
    setSelectedCandidate,
    setSelectedIds,
  };
}