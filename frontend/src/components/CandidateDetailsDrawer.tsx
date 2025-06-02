import React from "react";
import type { Candidate } from "../types";
import CVList from "./CVList";
import {
  Drawer,
  Typography,
  Box,
  Divider
} from "@mui/material";

interface CandidateDetailsDrawerProps {
  open: boolean;
  candidate: Candidate | null;
  onClose: () => void;
  cvs: any[];
}

const CandidateDetailsDrawer: React.FC<CandidateDetailsDrawerProps> = ({
  open,
  candidate,
  onClose,
  cvs,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        {candidate && (
          <>
            <Typography variant="h5">{candidate.candidate_name}</Typography>
            <Typography variant="subtitle1">{candidate.email}</Typography>
            <Typography variant="subtitle1">{candidate.country}</Typography>
            <Typography variant="subtitle2">{candidate.birth_date}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">CVs</Typography>
            <CVList cvs={cvs} />
          </>
        )}
        {!candidate && (
          <Typography variant="body2">No candidate selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default CandidateDetailsDrawer;