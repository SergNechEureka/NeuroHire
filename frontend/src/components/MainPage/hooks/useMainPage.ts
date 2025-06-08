import { useTranslation } from 'react-i18next';
import { NavigationItems } from '../types';

export const useMainPage = () => {
  const { t } = useTranslation('MainPage');

  const navigationItems: NavigationItems = [
    { id: 'main', path: '/', label: t('navigation.main') },
    { id: 'candidates', path: '/candidates', label: t('navigation.candidates') },
    { id: 'projects', path: '/projects', label: t('navigation.projects') },
    { id: 'applications', path: '/applications', label: t('navigation.applications') },
    { id: 'administration', path: '/administration', label: t('navigation.administration') },
    { id: 'users', path: '/users', label: t('navigation.users') },
    { id: 'database', path: '/database', label: t('navigation.database') },
  ];

  return {
    navigationItems,
  };
}; 