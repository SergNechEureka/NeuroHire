export interface JobStatus {
    status: string;
    progress: number;
};

export interface CVUploadResult {
    filename: string;
    jobId: string;
}