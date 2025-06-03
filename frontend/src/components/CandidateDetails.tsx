import React from "react";
import { Paper, Typography } from "@mui/material";
import type { Candidate } from "../types/models";

interface CandidateDetailsProps {
  selectedCandidate: Candidate;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({
  selectedCandidate,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">Candidate Details</Typography>
      <Typography variant="body1">
        Name: {selectedCandidate.candidate_name}
      </Typography>
      {/* You can add more fields as needed */}
    </Paper>
  );
};

export default CandidateDetails;
