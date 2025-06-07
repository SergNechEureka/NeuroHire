import type { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  children?: NavigationItem[];
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  mode: 'normal' | 'compact';
  activeItemId?: string;
  onItemClick: (item: NavigationItem) => void;
  className?: string;
} 