import React from "react";
import { Paper, Typography } from "@mui/material";
import type { CVSkill } from "../types/models";

interface CandidateSkillsTableProps {
  selectedCandidateId: string;
}

const CandidateSkillsTable: React.FC<CandidateSkillsTableProps> = ({
  selectedCandidateId,
}) => {
  const skills: CVSkill[] = [];
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
