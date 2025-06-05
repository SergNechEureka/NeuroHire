import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useUploadDialog } from "../hooks/useUploadDialog";

type UploadDialogProps = {
  open: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
};

const getStatusProps = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        color: "success.main",
        icon: <CheckCircleIcon color="success" />,
      };
    case "Error":
      return { color: "error.main", icon: <ErrorIcon color="error" /> };
    default:
      return { color: "info.main", icon: <HourglassTopIcon color="info" /> };
  }
};

const UploadDialog: React.FC<UploadDialogProps> = ({
  open,
  onClose,
  onUploadComplete,
}) => {
  const {
    handleFilesDrop,
    fileJobs,
    handleDialogClose,
    inputRef,
    handleFilesChange,
    triggerFileInput,
  } = useUploadDialog({ onClose, onUploadComplete });

  const allCompleted = fileJobs.every(
    (job) => job.status === "Completed" || job.status === "Error"
  );

  const { t } = useTranslation();

  const getStatusText = (status: string) => {
    switch (status) {
      case "Completed":
        return t("uploadStatusCompleted");
      case "Error":
        return t("uploadStatusError");
      default:
        return t("uploadStatusUploading");
    }
  };

  const [dragActive, setDragActive] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragActive(false);
    handleFilesDrop(e);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState<"success" | "error">(
    "success"
  );

  React.useEffect(() => {
    if (fileJobs.length === 0) return;
    const allCompleted = fileJobs.every(
      (job) => job.status === "Completed" || job.status === "Error"
    );
    const anyError = fileJobs.some((job) => job.status === "Error");
    if (allCompleted) {
      setSnackbarType(anyError ? "error" : "success");
      setSnackbarOpen(true);
    }
  }, [fileJobs]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("uploadFiles")}</DialogTitle>
      <DialogContent>
        <Box
          p={2}
          border={dragActive ? "2px solid #1976d2" : "2px dashed #888"}
          borderRadius={2}
          textAlign="center"
          bgcolor={dragActive ? "#e3f2fd" : "#222"}
          color="#eee"
          sx={{ cursor: "pointer", transition: "all 0.2s" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          <CloudUploadIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: dragActive ? "#1976d2" : undefined,
            }}
          />
          <Typography variant="subtitle1">{t("drag_and_drop")}</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            mt={1}
          >
            <InfoOutlinedIcon fontSize="small" color="info" />
            <Typography variant="caption" color="info.main">
              {t("supportedFormats")}
            </Typography>
          </Stack>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFilesChange}
          />
        </Box>
        <List>
          {fileJobs.map((job) => {
            const { color, icon } = getStatusProps(job.status);
            return (
              <ListItem key={job.jobId || job.filename}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ flex: 1 }}
                >
                  {icon}
                  <ListItemText
                    primary={job.filename}
                    secondary={getStatusText(job.status)}
                    sx={{ color }}
                  />
                </Stack>
                <Box width={150} mr={2}>
                  <LinearProgress
                    variant={
                      job.progress < 100 ? "determinate" : "indeterminate"
                    }
                    value={job.progress}
                    sx={{ height: 8, borderRadius: 2 }}
                    color={
                      job.status === "Error"
                        ? "error"
                        : job.status === "Completed"
                        ? "success"
                        : "info"
                    }
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color, minWidth: 40, textAlign: "right" }}
                >{`${job.progress}%`}</Typography>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogClose}
          disabled={!allCompleted}
        >
          {t("close")}
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarType === "success" ? t("uploadSuccess") : t("uploadError")}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UploadDialog;
