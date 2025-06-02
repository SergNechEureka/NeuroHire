import { useState, useEffect } from "react";
import { Candidate, CVExperience, CVSkill } from "../types";
import { fetchCandidateDetails } from "../api/candidates";

export function useCandidateDetails(candidateId: string | null) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [experiences, setExperiences] = useState<CVExperience[]>([]);
  const [skills, setSkills] = useState<CVSkill[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!candidateId) {
      setCandidate(null);
      setExperiences([]);
      setSkills([]);
      return;
    }
    setLoading(true);
    fetchCandidateDetails(candidateId).then(data => {
      setCandidate(data.candidate);
      setExperiences(data.experiences);
      setSkills(data.skills);
      setLoading(false);
    });
  }, [candidateId]);

  return { candidate, experiences, skills, loading };
}