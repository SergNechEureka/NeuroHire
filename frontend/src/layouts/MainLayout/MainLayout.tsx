import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { Dashboard, People, Settings, Assessment } from '@mui/icons-material';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NavigationMenu } from './components/NavigationMenu';
import { MobileNavigation } from './components/MobileNavigation';
import styles from './MainLayout.module.css';

const navigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
    tooltip: 'Dashboard',
  },
  {
    id: 'candidates',
    title: 'Candidates',
    icon: <People />,
    path: '/candidates',
    tooltip: 'Candidates',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: <Assessment />,
    path: '/analytics',
    tooltip: 'Analytics',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings />,
    path: '/settings',
    tooltip: 'Settings',
  },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={styles.layout}>
      <Header className={styles.header} />

      <div className={styles.main}>
        {!isMobile && (
          <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar}>
            <NavigationMenu
              items={navigationItems}
              isExpanded={isSidebarExpanded}
              onItemClick={handleNavigation}
            />
          </Sidebar>
        )}

        <main className={styles.content}>{children}</main>
      </div>

      {isMobile && (
        <MobileNavigation
          items={navigationItems}
          onItemClick={handleNavigation}
          currentPath={location.pathname}
        />
      )}
    </div>
  );
};
