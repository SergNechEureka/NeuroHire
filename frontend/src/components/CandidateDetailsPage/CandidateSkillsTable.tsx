import React from 'react';
import { Paper, Typography } from '@mui/material';
import type { CVSkill } from 'api./api./types/models';
import { useTranslation } from 'react-i18next';

interface CandidateSkillsTableProps {
  selectedCandidateId: string;
  skills: CVSkill[];
}

const CandidateSkillsTable: React.FC<CandidateSkillsTableProps> = ({ skills }) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{t('skills')}</Typography>
      <Typography variant="body2">
        {/* Пока просто заглушка для таблицы скиллов */}
        {skills && skills.length > 0 ? t('skillsTableHere') : t('noSkillsData')}
      </Typography>
    </Paper>
  );
};

export default CandidateSkillsTable;
