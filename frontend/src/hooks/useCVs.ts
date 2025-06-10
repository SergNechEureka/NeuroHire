import { useState, useEffect } from "react";
import type { CV } from "../types/models";
import { fetchCandidateCVs, deleteCVs } from "../api/cvs";

export function useCVs(candidateId: string | null) {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) {
      setCVs([]);
      return;
    }
    setLoading(true);
    fetchCandidateCVs(candidateId).then(data => {
      setCVs(data);
      setLoading(false);
    });
  }, [candidateId]);

  const removeCVs = async (ids: string[]) => {
    await deleteCVs(ids);
    setCVs(prev => prev.filter(c => !ids.includes(c.cv_id)));
  };

  return { cvs, loading, removeCVs, setCVs };
}