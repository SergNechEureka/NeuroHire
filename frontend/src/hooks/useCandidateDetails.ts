import { useState, useEffect } from "react";
import { fetchCandidateDetails } from "../api/candidates";
import { fetchCVsForCandidate } from "../api/cvs";
import type { Candidate } from "../types";

export function useCandidateDetails(candidateId: string | null) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [cvs, setCVs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) {
      setCandidate(null);
      setCVs([]);
      return;
    }
    setLoading(true);
    Promise.all([
      fetchCandidateDetails(candidateId),
      fetchCVsForCandidate(candidateId),
    ])
      .then(([candidate, cvs]) => {
        setCandidate(candidate);
        setCVs(cvs);
      })
      .finally(() => setLoading(false));
  }, [candidateId]);

  return { candidate, cvs, loading };
}