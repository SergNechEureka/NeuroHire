import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/exports';
import { MainPage } from '../components/MainPage';
import { ProjectsPage } from '../components/ProjectsPage';
import { ApplicationsPage } from '../components/ApplicationsPage';
import { AdministrationPage } from '../components/AdministrationPage';
import { UsersPage } from '../components/UsersPage';
import { DatabasePage } from '../components/DatabasePage';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';

const navigationItems = [
  {
    id: 'main',
    label: 'Main',
    icon: <HomeIcon />,
    children: [
      { id: 'candidates', path: '/candidates', label: 'Candidates', icon: <PeopleIcon /> },
      { id: 'projects', path: '/projects', label: 'Projects', icon: <WorkIcon /> },
      {
        id: 'applications',
        path: '/applications',
        label: 'Applications',
        icon: <AssignmentIcon />,
      },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    icon: <AdminPanelSettingsIcon />,
    children: [
      { id: 'users', path: '/users', label: 'Users', icon: <PersonIcon /> },
      { id: 'database', path: '/database', label: 'Database', icon: <StorageIcon /> },
    ],
  },
];

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <MainPage>{null}</MainPage>
            </MainLayout>
          }
        />
        <Route
          path="/candidates"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <MainPage>{null}</MainPage>
            </MainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <ProjectsPage />
            </MainLayout>
          }
        />
        <Route
          path="/applications"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <ApplicationsPage />
            </MainLayout>
          }
        />
        <Route
          path="/administration"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <AdministrationPage />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <UsersPage />
            </MainLayout>
          }
        />
        <Route
          path="/database"
          element={
            <MainLayout navigationItems={navigationItems} showHeader={false}>
              <DatabasePage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
