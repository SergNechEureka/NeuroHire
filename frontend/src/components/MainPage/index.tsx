import { type ReactNode } from 'react';
import { useMainPage } from './hooks/useMainPage';
import { MainLayout } from '../../layouts/MainLayout';
import styled from '@emotion/styled';
import { styles } from './styles';

interface MainPageProps {
  children: ReactNode;
}

const Container = styled.div(styles.container);
const Content = styled.div(styles.content);

export const MainPage = ({ children }: MainPageProps) => {
  const { navigationItems } = useMainPage();

  return (
    <MainLayout navigationItems={navigationItems}>
      <Container>
        <Content>{children}</Content>
      </Container>
    </MainLayout>
  );
};
