import React, { useState } from 'react';
import {
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

import CandidateNavigation from './CandidateNavigation';
import CandidateDetails from './CandidateDetails';
import CandidateExperienceTable from './CandidateExperienceTable';
import CandidateSkillsTable from './CandidateSkillsTable';
import type { Candidate } from 'api./api./types/models';

interface CandidateDetailsPageProps {
  onBack: () => void;
  selectedCandidate: Candidate;
  candidates: Candidate[];
}

const CandidateDetailsPage: React.FC<CandidateDetailsPageProps> = ({
  onBack,
  selectedCandidate,
  candidates,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(selectedCandidate.candidate_id);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCandidateSelect = (id: string) => {
    setSelectedCandidateId(id);
    setIsDrawerOpen(false);
  };

  const currentCandidate = candidates.find((c) => c.candidate_id === selectedCandidateId)!;

  const NavigationContent = () => (
    <Box sx={{ p: 2 }}>
      <CandidateNavigation
        selectedCandidateId={selectedCandidateId}
        candidates={candidates}
        onSelect={handleCandidateSelect}
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" onClick={onBack} sx={{ cursor: 'pointer' }}>
              {t('candidates')}
            </Link>
            <Typography color="text.primary">{t('candidate')}</Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              width: 280,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 280,
                boxSizing: 'border-box',
              },
            }}
          >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
            </Box>
            <NavigationContent />
          </Drawer>
        ) : (
          <Box
            sx={{
              width: 280,
              flexShrink: 0,
              borderRight: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <NavigationContent />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <CandidateDetails selectedCandidate={currentCandidate} />
          </Paper>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('experience')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CandidateExperienceTable
              selectedCandidateId={currentCandidate.candidate_id}
              experience={[]}
            />
          </Paper>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6">{t('skills')}</Typography>
            <Typography variant="body2">{t('noSkillsData')}</Typography>
            <Divider sx={{ mb: 2 }} />
            <CandidateSkillsTable selectedCandidateId={currentCandidate.candidate_id} skills={[]} />
          </Paper>
          {/* <CandidateCVs selectedCandidateId={currentCandidate.candidate_id} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateDetailsPage;
