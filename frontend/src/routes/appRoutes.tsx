import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { MainPage } from '../components/MainPage';
import { CandidatesPage } from '../components/CandidatesPage';
import { ProjectsPage } from '../components/ProjectsPage';
import { ApplicationsPage } from '../components/ApplicationsPage';
import { AdministrationPage } from '../components/AdministrationPage';
import { UsersPage } from '../components/UsersPage';
import { DatabasePage } from '../components/DatabasePage';

const navigationItems = [
  { path: '/', label: 'Main' },
  { path: '/candidates', label: 'Candidates' },
  { path: '/projects', label: 'Projects' },
  { path: '/applications', label: 'Applications' },
  { path: '/administration', label: 'Administration' },
  { path: '/users', label: 'Users' },
  { path: '/database', label: 'Database' },
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
