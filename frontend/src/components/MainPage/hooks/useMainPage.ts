import React from 'react';
import { type NavigationItems } from '../types';
import { useTranslation } from 'react-i18next';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

export const useMainPage = () => {
  const { t } = useTranslation();

  const navigationItems: NavigationItems = [
    {
      id: 'main',
      label: t('navigation.main'),
      path: '/',
      icon: React.createElement(DashboardIcon),
    },
    {
      id: 'candidates',
      label: t('navigation.candidates'),
      path: '/candidates',
      icon: React.createElement(PeopleIcon),
    },
    {
      id: 'projects',
      label: t('navigation.projects'),
      path: '/projects',
      icon: React.createElement(AssignmentIcon),
    },
    {
      id: 'applications',
      label: t('navigation.applications'),
      path: '/applications',
      icon: React.createElement(DescriptionIcon),
    },
    {
      id: 'administration',
      label: t('navigation.administration'),
      path: '/administration',
      icon: React.createElement(SettingsIcon),
    },
    {
      id: 'users',
      label: t('navigation.users'),
      path: '/users',
      icon: React.createElement(PersonIcon),
    },
    {
      id: 'database',
      label: t('navigation.database'),
      path: '/database',
      icon: React.createElement(StorageIcon),
    },
  ];

  return {
    navigationItems,
  };
}; 