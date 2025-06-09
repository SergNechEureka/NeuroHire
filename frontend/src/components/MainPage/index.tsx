import { type ReactNode } from 'react';
import styled from '@emotion/styled';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CandidatesTable from '../CandidatesTable';
import useCandidates from '../../hooks/useCandidates';
import type { NavigationItem } from '../../layouts/MainLayout/components/NavigationMenu/types';

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
  const tableProps = useCandidates();

  const shouldShowCandidatesTable =
    activeMenuItem?.id === 'candidates' || location.pathname === '/candidates';

  return (
    <Container>
      <Content>
        {shouldShowCandidatesTable ? (
          <CandidatesTable {...tableProps} />
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
