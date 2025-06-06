import { useRef, useState, useEffect } from "react";
import { uploadCVs, getUploadStatuses } from "../../api/cvs";
import type { FileJob } from "../../types/common";
import type { JobStatus } from "../../types/apis";

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
  const [dragActive, setDragActive] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

  // Ref to always have the latest fileJobs in polling
  const fileJobsRef = useRef(fileJobs);
  fileJobsRef.current = fileJobs;

  // Reset fileJobs when dialog is opened
  useEffect(() => {
    if (open) {
      setFileJobs([]);
    }
  }, [open]);

  // Handle snackbar state based on file jobs
  useEffect(() => {
    if (fileJobs.length === 0) return;
    const allCompleted = fileJobs.every(
      (job) => job.progress === 100 || job.progress === -1
    );
    const anyError = fileJobs.some((job) => job.progress === -1);
    if (allCompleted) {
      setSnackbarType(anyError ? "error" : "success");
      setSnackbarOpen(true);
    }
  }, [fileJobs]);

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
    setDragActive(false);
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
    } catch (error: unknown) {
      let errorMsg = "Unknown error";
      if (typeof error === "object" && error !== null) {
        // @ts-expect-error: axios error shape
        errorMsg = error?.response?.data?.detail || error?.message || String(error);
      } else {
        errorMsg = String(error);
      }
      alert(`Error uploading files: ${errorMsg}`);
      setIsUploading(false);
    }
  };

  // Poll statuses for all jobs
  useEffect(() => {
    if (!polling) return;

    const poll = async () => {
      const currentJobs = fileJobsRef.current;

      const activeJobs = currentJobs.filter(job => job.progress !== 100 && job.progress !== -1);
      const jobIds = activeJobs.map(job => job.jobId);
      let statuses: Record<string, JobStatus | undefined> = {};
      let batchError: string | null = null;
      try {
        statuses = await getUploadStatuses(jobIds);
      } catch (error) {
        if (typeof error === "object" && error !== null) {
          // @ts-expect-error: axios error shape
          batchError = error?.response?.data?.detail || error?.message || String(error);
        } else {
          batchError = String(error);
        }
      }

      const newJobs = currentJobs.map(job => {
        if (batchError) {
          return { ...job, status: "Error", progress: -1, statusMessage: `Error: ${batchError}` };
        }
        // Если job не в списке активных, не обновляем
        if (!jobIds.includes(job.jobId)) return job;
        const status = statuses[job.jobId];
        if (!status) {
          return { ...job, status: "Error", progress: -1, statusMessage: "Error: job status not found (possibly deleted)" };
        }
        return {
          ...job,
          status: status.status,
          statusMessage: status.status,
          progress: status.progress
        };
      });

      const pendingJobs = newJobs.filter(job => job.progress !== 100 && job.progress !== -1 && job.status !== "Error: job status not found (possibly deleted)");

      if (pendingJobs.length === 0) {
        setPolling(false);
        setIsUploading(false);
        const anyError = newJobs.some(job => job.progress === -1);
        if (!anyError && onUploadComplete) onUploadComplete();
        if (anyError && onUploadError) onUploadError();
        setFileJobs(newJobs);
        return;
      }

      setFileJobs(newJobs);
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
      if (typeof onUploadComplete === 'function') {
        onUploadComplete();
      }
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Snackbar handlers
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return {
    // File handling
    inputRef,
    triggerFileInput,
    handleFilesChange,
    handleFilesDrop,
    fileJobs,
    isUploading,
    handleDialogClose,
    
    // Drag & drop
    dragActive,
    handleDragOver,
    handleDragLeave,
    
    // Snackbar
    snackbarOpen,
    snackbarType,
    handleSnackbarClose
  };
} 