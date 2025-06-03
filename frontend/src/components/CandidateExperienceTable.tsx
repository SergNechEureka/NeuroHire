import React from "react";
import { Paper, Typography } from "@mui/material";

interface CandidateExperienceTableProps {
  experience: any[]; // Заменить на корректный тип, если появится структура
}

const CandidateExperienceTable: React.FC<CandidateExperienceTableProps> = ({
  experience,
}) => {
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
