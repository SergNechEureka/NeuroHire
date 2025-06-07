import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Sidebar } from './components/Sidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { useLayout } from './hooks/useLayout';
import { MainLayoutProps } from './types';
import {
  layoutStyles,
  contentStyles,
  sidebarStyles,
  mainStyles,
  mobileSidebarHidden,
} from './styles';

export const MainLayout: React.FC<MainLayoutProps> = ({ children, defaultMode, onModeChange }) => {
  const { t } = useTranslation('layout');
  const {
    mode,
    isMobileMenuOpen,
    activeItem,
    handleModeChange,
    handleMobileMenuToggle,
    handleItemClick,
  } = useLayout({ defaultMode, onModeChange });

  return (
    <div css={layoutStyles}>
      <Header
        onMenuToggle={handleMobileMenuToggle}
        onModeChange={handleModeChange}
        currentMode={mode}
      />

      <div css={contentStyles}>
        <Sidebar
          mode={mode}
          onModeChange={handleModeChange}
          css={[sidebarStyles, mobileSidebarHidden]}
        >
          <NavigationMenu activeItem={activeItem} onItemClick={handleItemClick} />
        </Sidebar>

        <main css={mainStyles}>{children}</main>
      </div>

      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuToggle}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
    </div>
  );
};
