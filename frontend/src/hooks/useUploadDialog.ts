// src/useUploadDialog.ts
import { useRef, useState, useEffect } from "react";
import { uploadCVs, getUploadStatus } from "../api/cvs";
import type { FileJob } from "../types/common";

type UploadDialogHookProps = {
  onClose: () => void;
  onUploadComplete: () => void;
  onUploadError?: () => void;
  open: boolean;
};

export function useUploadDialog({ onClose, onUploadComplete, onUploadError, open }: UploadDialogHookProps) {
  const [fileJobs, setFileJobs] = useState<FileJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [polling, setPolling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ref to always have the latest fileJobs in polling
  const fileJobsRef = useRef(fileJobs);
  fileJobsRef.current = fileJobs;

  // Reset fileJobs when dialog is opened
  useEffect(() => {
    if (open) {
      setFileJobs([]);
    }
  }, [open]);

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
    files.forEach(f => formData.append("files", f));

    try {
      const uploadResult = await uploadCVs(formData);

      const jobs: FileJob[] = uploadResult.map((f: { filename: string; jobId: string }) => ({
        filename: f.filename,
        jobId: f.jobId,
        status: "Queued",
        progress: 0,
      }));
      setFileJobs(jobs);
      setPolling(true); // Start polling statuses
    } catch {
      alert("Error uploading files");
      setIsUploading(false);
    }
  };

  // Poll statuses for all jobs (fixed: only depends on polling)
  useEffect(() => {
    if (!polling) return;
    let cancelled = false;

    const poll = async () => {
      const currentJobs = fileJobsRef.current;
      const pendingJobs = currentJobs.filter(job =>
        job.progress !== 100 && job.progress !== -1 && job.status !== "Error"
      );
      if (pendingJobs.length === 0) {
        setPolling(false);
        setIsUploading(false);
        const anyError = currentJobs.some(job => job.progress === -1);
        if (!anyError && onUploadComplete) onUploadComplete();
        if (anyError && onUploadError) onUploadError();
        return;
      }

      const newJobs = await Promise.all(
        currentJobs.map(async job => {
          if (job.status === "Completed" || job.status === "Error") return job;
          try {
            const jobStatus = await getUploadStatus(job.jobId)
            return {
              ...job,
              status: jobStatus.status,
              statusMessage: jobStatus.status,
              progress: jobStatus.progress
            };
          } catch {
            return { ...job, status: "Error", progress: -1, statusMessage: "Error" };
          }
        })
      );
      if (!cancelled) setFileJobs(newJobs);
    };

    const interval = setInterval(poll, 1000);
    poll();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [polling]);

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