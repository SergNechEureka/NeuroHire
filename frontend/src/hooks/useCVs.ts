import { useState, useEffect } from "react";
import { CVMeta } from "../types/models";
import { fetchCVsByCandidate, deleteCVs } from "../api/cvs";

export function useCVs(candidateId: string | null) {
  const [cvs, setCVs] = useState<CVMeta[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) {
      setCVs([]);
      return;
    }
    setLoading(true);
    fetchCVsByCandidate(candidateId).then(data => {
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