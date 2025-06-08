import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { MainPage } from '../components/MainPage';
import { CandidatesPage } from '../components/CandidatesPage';
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
  { id: 'main', path: '/', label: 'Main', icon: <HomeIcon /> },
  { id: 'candidates', path: '/candidates', label: 'Candidates', icon: <PeopleIcon /> },
  { id: 'projects', path: '/projects', label: 'Projects', icon: <WorkIcon /> },
  { id: 'applications', path: '/applications', label: 'Applications', icon: <AssignmentIcon /> },
  {
    id: 'administration',
    path: '/administration',
    label: 'Administration',
    icon: <AdminPanelSettingsIcon />,
  },
  { id: 'users', path: '/users', label: 'Users', icon: <PersonIcon /> },
  { id: 'database', path: '/database', label: 'Database', icon: <StorageIcon /> },
];

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainLayout navigationItems={navigationItems}>
            <MainPage>
              <CandidatesPage />
            </MainPage>
          </MainLayout>
        </Route>
        <Route exact path="/candidates">
          <MainLayout navigationItems={navigationItems}>
            <CandidatesPage />
          </MainLayout>
        </Route>
        <Route exact path="/projects">
          <MainLayout navigationItems={navigationItems}>
            <ProjectsPage />
          </MainLayout>
        </Route>
        <Route exact path="/applications">
          <MainLayout navigationItems={navigationItems}>
            <ApplicationsPage />
          </MainLayout>
        </Route>
        <Route exact path="/administration">
          <MainLayout navigationItems={navigationItems}>
            <AdministrationPage />
          </MainLayout>
        </Route>
        <Route exact path="/users">
          <MainLayout navigationItems={navigationItems}>
            <UsersPage />
          </MainLayout>
        </Route>
        <Route exact path="/database">
          <MainLayout navigationItems={navigationItems}>
            <DatabasePage />
          </MainLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
