import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { MainLayoutProps } from './types';
import { useSidebar } from './hooks/useSidebar';
import { LayoutContainer, MainContent, StyledDrawer, MobileDrawer } from './styles';
import { Sidebar } from './components/Sidebar';
import { NavigationMenu } from './components/NavigationMenu';
import { MobileNavigation } from './components/MobileNavigation';
import { Header } from './components/Header';

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isExpanded, isMobile, toggleSidebar } = useSidebar();

  return (
    <LayoutContainer>
      <Header onMenuClick={toggleSidebar} />

      <StyledDrawer variant="permanent" className={isExpanded ? '' : 'collapsed'}>
        <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar}>
          <NavigationMenu isExpanded={isExpanded} />
        </Sidebar>
      </StyledDrawer>

      <MobileDrawer variant="temporary" open={isMobile && isExpanded} onClose={toggleSidebar}>
        <MobileNavigation isOpen={isMobile && isExpanded} onClose={toggleSidebar} />
      </MobileDrawer>

      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};
