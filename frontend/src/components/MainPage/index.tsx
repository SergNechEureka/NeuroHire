import { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CandidatesTable from '../CandidatesTable';
import useCandidates from '../../hooks/useCandidates';
import type { NavigationItem } from '../../layouts/MainLayout/components/NavigationMenu/types';
import CandidateDetailsPage from '../CandidateDetailsPage';
import { Box, Typography, Button } from '@mui/material';

interface MainPageProps {
  children: ReactNode;
  activeMenuItem?: NavigationItem | null;
}

const Container = styled.div(styles.container);
const Content = styled.div(styles.content);
const Welcome = styled.div(styles.welcome);
const Title = styled.h1(styles.title);
const Description = styled.p(styles.description);

export const MainPage = ({ children, activeMenuItem }: MainPageProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const tableProps = useCandidates();

  const shouldShowCandidatesTable =
    !id && (activeMenuItem?.id === 'candidates' || location.pathname === '/candidates');

  if (id) {
    if (tableProps.loading) {
      return <Typography>{t('loading')}</Typography>;
    }
    const candidate = tableProps.candidates.find((c) => c.candidate_id === id);
    if (!candidate) {
      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {t('candidateNotFound')}
          </Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            {t('back')}
          </Button>
        </Box>
      );
    }
    return (
      <CandidateDetailsPage
        onBack={() => navigate('/candidates')}
        selectedCandidate={candidate}
        candidates={tableProps.candidates}
      />
    );
  }

  return (
    <Container>
      <Content>
        {shouldShowCandidatesTable ? (
          <CandidatesTable {api..tableProps} />
        ) : (
          <Welcome>
            <Title>{t('mainPage.title')}</Title>
            <Description>{t('mainPage.welcome')}</Description>
            <Description>{t('mainPage.description')}</Description>
            {children}
          </Welcome>
        )}
      </Content>
    </Container>
  );
};
