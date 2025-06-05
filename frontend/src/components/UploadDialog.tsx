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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
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

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("uploadFiles")}</DialogTitle>
      <DialogContent>
        <Box
          p={2}
          border="2px dashed #888"
          borderRadius={2}
          textAlign="center"
          bgcolor="#222"
          color="#eee"
          sx={{ cursor: "pointer" }}
          onDrop={handleFilesDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={triggerFileInput}
        >
          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="subtitle1">{t("drag_and_drop")}</Typography>
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
    </Dialog>
  );
};

export default UploadDialog;
