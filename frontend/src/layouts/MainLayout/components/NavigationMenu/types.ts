import type { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  path?: string;
  children?: NavigationItem[];
  isMainItem?: boolean;
}

export interface NavigationMenuProps {
  menuItems: NavigationItem[];
  mode: 'normal' | 'compact';
  activeItemId?: string;
  onItemClick: (item: NavigationItem) => void;
  className?: string;
  defaultExpandedItemId?: string;
}

export interface NavigationMenuState {
  expandedItems: Record<string, boolean>;
  activeItemId: string | null;
} 