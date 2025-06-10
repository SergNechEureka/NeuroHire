import React, { useState, useMemo } from 'react';
import { Paper, Typography, List, ListItemButton, TextField } from '@mui/material';
import type { Candidate } from '../types/models';
import { useTranslation } from 'react-i18next';

interface CandidateNavigationProps {
  candidates: Candidate[];
  selectedCandidateId: string;
  onSelect?: (id: string) => void;
}

const CandidateNavigation: React.FC<CandidateNavigationProps> = ({
  candidates,
  selectedCandidateId,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const filtered = useMemo(
    () => candidates.filter((c) => c.candidate_name.toLowerCase().includes(search.toLowerCase())),
    [candidates, search],
  );

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        size="small"
        fullWidth
        placeholder={t('searchByName')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List dense>
        {filtered.map((c) => (
          <ListItemButton
            key={c.candidate_id}
            selected={c.candidate_id === selectedCandidateId}
            onClick={() => onSelect && onSelect(c.candidate_id)}
          >
            <Typography
              fontWeight="bold"
              color={c.candidate_id === selectedCandidateId ? 'primary' : undefined}
              noWrap
            >
              {c.candidate_name}
            </Typography>
          </ListItemButton>
        ))}
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
            {t('noMatches')}
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default CandidateNavigation;
