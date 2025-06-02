import axios from "axios";
import type { Candidate } from "../types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function fetchCandidates(): Promise<Candidate[]> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<Candidate[]>(`${API_URL}candidates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function deleteCandidates(candidateIds: string[]): Promise<void> {
    const token = localStorage.getItem('access_token');
    await axios.delete(`${API_URL}candidates/`, {
        data: { ids: candidateIds },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

export async function fetchCandidateDetails(candidateId: string): Promise<Candidate> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<Candidate>(`${API_URL}candidates/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function deleteCandidate(candidateId: string): Promise<void> {
    const token = localStorage.getItem('access_token');
    await axios.delete(`${API_URL}candidate/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}