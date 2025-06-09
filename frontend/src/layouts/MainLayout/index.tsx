import React from 'react';
import styled from '@emotion/styled';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Sidebar } from './components/Sidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { useLayout } from './hooks/useLayout';
import type { MainLayoutProps } from './types';
import {
  layoutStyles,
  contentStyles,
  sidebarStyles,
  mainStyles,
  mobileSidebarHidden,
} from './styles';

const LayoutContainer = styled.div(layoutStyles);
const ContentContainer = styled.div(contentStyles);
const MainContent = styled.main(mainStyles);
const StyledSidebar = styled(Sidebar)`
  ${sidebarStyles}
  ${mobileSidebarHidden}
`;

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  navigationItems,
  defaultMode,
  onModeChange,
  showHeader,
}) => {
  const {
    mode,
    isMobileMenuOpen,
    activeItem,
    handleModeChange,
    handleMobileMenuToggle,
    handleItemClick,
  } = useLayout({
    defaultMode: defaultMode ?? 'normal',
    onModeChange,
  });

  return (
    <LayoutContainer>
      {showHeader && (
        <Header
          onMenuClick={handleMobileMenuToggle}
          onModeChange={handleModeChange}
          currentMode={mode}
        />
      )}

      <ContentContainer>
        <StyledSidebar mode={mode} onModeChange={handleModeChange}>
          <NavigationMenu
            items={navigationItems}
            mode={mode}
            activeItemId={activeItem?.id ?? undefined}
            onItemClick={handleItemClick}
          />
        </StyledSidebar>

        <MainContent>{children}</MainContent>
      </ContentContainer>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuToggle}
        navigationItems={navigationItems}
        activeItemId={activeItem?.id}
        onItemClick={handleItemClick}
      />
    </LayoutContainer>
  );
};
