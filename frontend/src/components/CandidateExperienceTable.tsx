import React from "react";
import { Paper, Typography } from "@mui/material";
import type { CVExperience } from "../types/models";

interface CandidateExperienceTableProps {
  selectedCandidateId: string;
}

const CandidateExperienceTable: React.FC<CandidateExperienceTableProps> = ({
  selectedCandidateId,
}) => {
  const experience: CVExperience[] = [];
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">Experience</Typography>
      <Typography variant="body2">
        {/* Пока просто заглушка, здесь будет таблица опыта */}
        {experience && experience.length > 0
          ? "Experience table will be here"
          : "No experience data"}
      </Typography>
    </Paper>
  );
};

export default CandidateExperienceTable;
