import React from 'react';
import { Paper, Typography } from '@mui/material';
import type { CVExperience } from 'api./api./types/models';
import { useTranslation } from 'react-i18next';

interface CandidateExperienceTableProps {
  selectedCandidateId: string;
  experience: CVExperience[];
}

const CandidateExperienceTable: React.FC<CandidateExperienceTableProps> = ({ experience }) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{t('experience')}</Typography>
      <Typography variant="body2">
        {/* Пока просто заглушка, здесь будет таблица опыта */}
        {experience && experience.length > 0 ? t('experienceTableHere') : t('noExperienceData')}
      </Typography>
    </Paper>
  );
};

export default CandidateExperienceTable;
