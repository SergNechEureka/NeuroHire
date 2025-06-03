import React from "react";
import { Paper, Typography } from "@mui/material";

interface CandidateNavigationProps {
  selectedCandidateId: string;
}

const CandidateNavigation: React.FC<CandidateNavigationProps> = ({
  selectedCandidateId,
}) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1">Sidebar navigation</Typography>
      <Typography variant="body2">
        Selected ID: {selectedCandidateId}
      </Typography>
    </Paper>
  );
};

export default CandidateNavigation;
