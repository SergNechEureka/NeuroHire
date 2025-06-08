import { type ReactNode } from 'react';

export interface MainPageProps {
  children?: ReactNode;
}

export interface NavigationItem {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
}

export type NavigationItems = NavigationItem[]; 