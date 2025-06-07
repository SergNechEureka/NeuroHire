import { useState } from 'react';
import type { MainLayoutProps } from './types';
import { LayoutContainer, ContentWrapper } from './styles';
import { Sidebar } from './components/Sidebar';
import { NavigationMenu } from './components/NavigationMenu';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { Home, People, Work, Assignment, AdminPanelSettings, Storage } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    id: 'main',
    title: '',
    icon: <Home />,
    path: '/dashboard',
    children: [
      { id: 'candidates', title: '', icon: <People />, path: '/dashboard/candidates' },
      { id: 'projects', title: '', icon: <Work />, path: '/dashboard/projects' },
      { id: 'applications', title: '', icon: <Assignment />, path: '/dashboard/applications' },
    ],
  },
  {
    id: 'administration',
    title: '',
    icon: <AdminPanelSettings />,
    path: '/dashboard/administration',
    children: [
      { id: 'users', title: '', icon: <People />, path: '/dashboard/administration/users' },
      { id: 'database', title: '', icon: <Storage />, path: '/dashboard/administration/database' },
    ],
  },
];

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Собираем все пункты для мобильной навигации (только leaf)
  const mobileNavItems = menuItems.flatMap((section) =>
    section.children ? section.children : [section],
  );

  return (
    <LayoutContainer>
      {/* Sidebar для desktop */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={() => setSidebarExpanded((v) => !v)}>
        <NavigationMenu
          items={menuItems.flatMap((section) => (section.children ? section.children : [section]))}
          isExpanded={isSidebarExpanded}
          onNavigate={navigate}
        />
      </Sidebar>
      {/* Header */}
      <ContentWrapper isSidebarExpanded={isSidebarExpanded}>
        <Header />
        {children}
      </ContentWrapper>
      {/* Mobile Navigation */}
      <MobileNavigation
        items={mobileNavItems}
        onNavigate={navigate}
        currentPath={location.pathname}
      />
    </LayoutContainer>
  );
};
