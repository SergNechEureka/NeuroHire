import type { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  title: string;
  icon: ReactNode;
  path: string;
  children?: NavigationItem[];
  tooltip?: string;
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  isExpanded: boolean;
  onItemClick: (path: string) => void;
}

export interface MenuItemProps {
  item: NavigationItem;
  isExpanded: boolean;
  isActive: boolean;
  onItemClick: (path: string) => void;
  level?: number;
} 