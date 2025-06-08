import { ReactNode } from 'react';

export interface MainPageProps {
  children?: ReactNode;
}

export interface NavigationItem {
  id: string;
  path: string;
  label: string;
}

export type NavigationItems = NavigationItem[]; 