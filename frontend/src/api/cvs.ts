// src/api/candidates.ts

import axios from "axios";
import type { CV, CVExperience, CVSkill } from "../types/models";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function uploadCVs(formData: FormData): Promise<void> {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(`${API_URL}upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" }
        });
    return response.data.jobs
}

export async function getUploadStatus(jobId: string): Promise<void> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${API_URL}upload-status/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}` }
        });
    return response.data
}

export async function deleteCVs(cvIds: string[]): Promise<void> {
    const token = localStorage.getItem('access_token');
    await axios.post(`${API_URL}cvs/delete`, { cv_ids: cvIds }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

export async function fetchCandidateCVs(candidateId: string): Promise<CV[]> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<CV[]>(`${API_URL}candidates/${candidateId}/cvs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function fetchCVExperiences(cvId: string): Promise<CVExperience[]> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<CVExperience[]>(`${API_URL}cvs/${cvId}/experience`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function fetchCVSkills(cvId: string): Promise<CVSkill[]> {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<CVSkill[]>(`${API_URL}cvs/${cvId}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}