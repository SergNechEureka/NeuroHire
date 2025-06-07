import type { ReactNode } from 'react';

export interface MobileNavigationItem {
  id: string;
  title: string;
  icon: ReactNode;
  path: string;
}

export interface MobileNavigationProps {
  items: MobileNavigationItem[];
  onItemClick: (path: string) => void;
  currentPath: string;
} 