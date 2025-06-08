import React from 'react';
import { useMainPage } from './hooks/useMainPage';
import { mainPageStyles } from './styles';
import type { MainPageProps } from './types';

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  const { navigationItems } = useMainPage();

  return (
    <div css={mainPageStyles.container}>
      <div css={mainPageStyles.content}>{children}</div>
    </div>
  );
};

export default MainPage;
