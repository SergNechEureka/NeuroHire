import React from 'react';
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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useUploadDialog } from 'api./hooks/upload/useUploadDialog';

type UploadDialogProps = {
  open: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
  onUploadError?: () => void;
};

const getStatusProps = (status: string, progress: number) => {
  if (progress === 100) {
    return {
      color: 'success.main',
      icon: <TaskAltIcon color="success" />,
    };
  }
  if (status === 'Error' || progress === -1) {
    return {
      color: 'error.main',
      icon: <ReportProblemIcon color="error" />,
    };
  }
  return { color: 'info.main', icon: <HourglassTopIcon color="info" /> };
};

const UploadDialog: React.FC<UploadDialogProps> = ({
  open,
  onClose,
  onUploadComplete,
  onUploadError,
}) => {
  const {
    // File handling
    inputRef,
    triggerFileInput,
    handleFilesChange,
    handleFilesDrop,
    fileJobs,
    handleDialogClose,

    // Drag & drop
    dragActive,
    handleDragOver,
    handleDragLeave,

    // Snackbar
    snackbarOpen,
    snackbarType,
    handleSnackbarClose,
  } = useUploadDialog({ onClose, onUploadComplete, onUploadError, open });

  const { t } = useTranslation();

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Completed':
        return t('uploadStatusCompleted');
      case 'Error':
        return t('uploadStatusError');
      default:
        return t('uploadStatusUploading');
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('uploadFiles')}</DialogTitle>
      <DialogContent>
        <Box
          p={2}
          border={dragActive ? '2px solid #1976d2' : '2px dashed #888'}
          borderRadius={2}
          textAlign="center"
          bgcolor={dragActive ? '#e3f2fd' : '#222'}
          color="#eee"
          sx={{ cursor: 'pointer', transition: 'all 0.2s' }}
          onDrop={handleFilesDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          <CloudUploadIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: dragActive ? '#1976d2' : undefined,
            }}
          />
          <Typography variant="subtitle1">{t('drag_and_drop')}</Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={1}>
            <InfoOutlinedIcon fontSize="small" color="info" />
            <Typography variant="caption" color="info.main">
              {t('supportedFormats')} (max 500 KB)
            </Typography>
          </Stack>
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFilesChange}
          />
        </Box>
        <List>
          {fileJobs.map((job) => {
            const { color, icon } = getStatusProps(job.status, job.progress);
            let textColor = undefined;
            if (job.status === 'Error' || job.progress === -1) textColor = 'error.main';
            else if (job.progress === 100) textColor = 'success.main';
            return (
              <ListItem key={job.jobId || job.filename}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
                  {icon}
                  <ListItemText
                    primary={job.filename}
                    secondary={job.statusMessage || getStatusText(job.status)}
                    sx={{ color: textColor }}
                  />
                </Stack>
                <Box width={150} mr={2}>
                  <LinearProgress
                    variant={job.progress < 100 ? 'determinate' : 'indeterminate'}
                    value={job.progress}
                    sx={{ height: 8, borderRadius: 2 }}
                    color={
                      job.status === 'Error'
                        ? 'error'
                        : job.status === 'Completed'
                          ? 'success'
                          : 'info'
                    }
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color, minWidth: 40, textAlign: 'right' }}
                >{`${job.progress}%`}</Typography>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleDialogClose}>
          {t('close')}
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarType === 'success' ? t('uploadSuccess') : t('uploadError')}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UploadDialog;
