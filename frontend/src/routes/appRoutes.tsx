import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { MainPage } from '../components/MainPage';
import { CandidatesPage } from '../components/CandidatesPage';
import { ProjectsPage } from '../components/ProjectsPage';
import { ApplicationsPage } from '../components/ApplicationsPage';
import { AdministrationPage } from '../components/AdministrationPage';
import { UsersPage } from '../components/UsersPage';
import { DatabasePage } from '../components/DatabasePage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <MainPage />
            </MainLayout>
          }
        />
        <Route
          path="/candidates"
          element={
            <MainLayout>
              <CandidatesPage />
            </MainLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <MainLayout>
              <ProjectsPage />
            </MainLayout>
          }
        />
        <Route
          path="/applications"
          element={
            <MainLayout>
              <ApplicationsPage />
            </MainLayout>
          }
        />
        <Route
          path="/administration"
          element={
            <MainLayout>
              <AdministrationPage />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <UsersPage />
            </MainLayout>
          }
        />
        <Route
          path="/database"
          element={
            <MainLayout>
              <DatabasePage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
