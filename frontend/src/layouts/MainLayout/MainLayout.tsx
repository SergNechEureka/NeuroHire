import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { NavigationMenu } from './components/NavigationMenu';
import { Sidebar } from './components/Sidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { useLayout } from './hooks/useLayout';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
  defaultMode?: 'normal' | 'compact' | 'hidden';
  onModeChange?: (mode: 'normal' | 'compact' | 'hidden') => void;
}

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
    <div className={styles.layout}>
      <Header
        onMenuToggle={handleMobileMenuToggle}
        onModeChange={handleModeChange}
        currentMode={mode}
      />

      <div className={styles.content}>
        <Sidebar mode={mode} onModeChange={handleModeChange} className={styles.sidebar}>
          <NavigationMenu activeItem={activeItem} onItemClick={handleItemClick} />
        </Sidebar>

        <main className={styles.main}>{children}</main>
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
