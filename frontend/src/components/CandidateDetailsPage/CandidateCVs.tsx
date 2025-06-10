import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

import type { CV } from '../../types/models';

interface CVsProps {
  onBack: () => void;
  cvs: CV[];
}

const CandidateCVs: React.FC<CVsProps> = ({ cvs }) => {
  if (!cvs || cvs.length === 0) return <Typography variant="body2">No CVs available</Typography>;

  return (
    <List>
      {cvs.map((cv) => (
        <React.Fragment key={cv.cv_id}>
          <ListItem>
            <ListItemText primary={cv.filename} secondary={cv.language} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default CandidateCVs;
