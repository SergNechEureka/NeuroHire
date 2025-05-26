// src/useUploadDialog.ts
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export type FileJob = {
  filename: string;
  job_id: string;
  status: string;
  progress: number;
};

type UploadDialogHookProps = {
  onClose: () => void;
  onUploadComplete: () => void;
};

export function useUploadDialog({ onClose, onUploadComplete }: UploadDialogHookProps) {
  const [fileJobs, setFileJobs] = useState<FileJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [polling, setPolling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger hidden input for file selection
  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  // Handle file input selection
  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await uploadFiles(Array.from(e.target.files));
  };

  // Handle drag & drop files
  const handleFilesDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    await uploadFiles(Array.from(e.dataTransfer.files));
  };

  // Upload files to backend
  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    const formData = new FormData();
    const token = localStorage.getItem('access_token');
    files.forEach(f => formData.append("files", f));

    try {
      const res = await axios.post(`${API_URL}upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" }
      });
      // Each job: { filename, job_id }
      const jobs: FileJob[] = res.data.jobs.map((f: any) => ({
        filename: f.filename,
        job_id: f.job_id,
        status: "Queued",
        progress: 0,
      }));
      setFileJobs(jobs);
      setPolling(true); // Start polling statuses
    } catch (e) {
      alert("Error uploading files");
      setIsUploading(false);
    }
  };

  // Poll statuses for all jobs
  useEffect(() => {
    if (!polling) return;
    let cancelled = false;

    const poll = async () => {
      // Only poll jobs that are not finished
      const pendingJobs = fileJobs.filter(job =>
        job.status !== "Completed" && job.status !== "Error"
      );
      if (pendingJobs.length === 0) {
        setPolling(false);
        setIsUploading(false);
        if (onUploadComplete) onUploadComplete();
        return;
      }

      // Request status for each job
      const newJobs = await Promise.all(
        fileJobs.map(async job => {
          if (job.status === "Completed" || job.status === "Error") return job;
          try {
            const token = localStorage.getItem('access_token');
            const res = await axios.get(`${API_URL}upload-status/${job.job_id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return {
              ...job,
              status: res.data.status,
              progress: res.data.progress
            };
          } catch {
            return { ...job, status: "Error", progress: -1 };
          }
        })
      );
      if (!cancelled) setFileJobs(newJobs);
    };

    const interval = setInterval(poll, 15000);
    poll();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [polling, fileJobs]);

  // Close dialog if not uploading
  const handleDialogClose = () => {
    if (!isUploading) {
      setFileJobs([]);
      onClose();
    }
  };

  return {
    inputRef,
    triggerFileInput,
    handleFilesDrop,
    handleFilesChange,
    fileJobs,
    isUploading,
    handleDialogClose
  };
}