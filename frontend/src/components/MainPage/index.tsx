import { type ReactNode } from 'react';
import { useMainPage } from './hooks/useMainPage';
import { MainLayout } from '../../layouts/MainLayout/exports';
import styled from '@emotion/styled';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

interface MainPageProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Container = styled.div(styles.container);
const Content = styled.div(styles.content);
const Welcome = styled.div(styles.welcome);
const Title = styled.h1(styles.title);
const Description = styled.p(styles.description);

export const MainPage = ({ children, showHeader }: MainPageProps) => {
  const { t } = useTranslation();
  const { navigationItems } = useMainPage();

  return (
    <MainLayout navigationItems={navigationItems} title={t('header:title')} showHeader={showHeader}>
      <Container>
        <Content>
          <Welcome>
            <Title>{t('mainPage.title')}</Title>
            <Description>{t('mainPage.welcome')}</Description>
            <Description>{t('mainPage.description')}</Description>
          </Welcome>
          {children}
        </Content>
      </Container>
    </MainLayout>
  );
};
