import React from "react";
import { Paper, Typography } from "@mui/material";

interface CandidateSkillsTableProps {
  skills: any[]; // Позже заменить на правильный тип
}

const CandidateSkillsTable: React.FC<CandidateSkillsTableProps> = ({
  skills,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">Skills</Typography>
      <Typography variant="body2">
        {/* Пока просто заглушка для таблицы скиллов */}
        {skills && skills.length > 0
          ? "Skills table will be here"
          : "No skills data"}
      </Typography>
    </Paper>
  );
};

export default CandidateSkillsTable;
