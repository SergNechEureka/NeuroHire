import type { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  title: string;
  icon: ReactNode;
  path: string;
  children?: MenuItem[];
}

export interface NavigationMenuProps {
  items: MenuItem[];
  isExpanded: boolean;
  onNavigate: (path: string) => void;
} 