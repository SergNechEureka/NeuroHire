import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, LinearProgress, Typography, List, ListItem, ListItemText
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadDialog } from "../hooks/useUploadDialog";

type UploadDialogProps = {
  open: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
};

const UploadDialog: React.FC<UploadDialogProps> = ({ open, onClose, onUploadComplete }) => {
  const {
    handleFilesDrop,
    fileJobs,
    handleDialogClose,
    inputRef,
    handleFilesChange,
    triggerFileInput,
  } = useUploadDialog({ onClose, onUploadComplete });

  const allCompleted = fileJobs.every(job => job.status === "Completed" || job.status === "Error");
  
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload CV Files</DialogTitle>
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
          onDragOver={e => e.preventDefault()}
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
          {fileJobs.map(job => (
            <ListItem key={job.job_id || job.filename}>
              <ListItemText
                primary={job.filename}
                secondary={job.status}
              />
              <Box width={150} mr={2}>
                <LinearProgress
                  variant={job.progress < 100 ? "determinate" : "indeterminate"}
                  value={job.progress}
                  sx={{ height: 8, borderRadius: 2 }}
                />
              </Box>
              <Typography variant="body2">{`${job.progress}%`}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button   variant="contained" color="primary" onClick={handleDialogClose} disabled={!allCompleted}>
          ЗАКРЫТЬ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;