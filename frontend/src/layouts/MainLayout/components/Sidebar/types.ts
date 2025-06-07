import type { NavigationItem } from '../NavigationMenu/types';

export type SidebarMode = 'normal' | 'compact';

export interface SidebarProps {
  mode: SidebarMode;
  navigationItems: NavigationItem[];
  onModeChange: (mode: SidebarMode) => void;
  activeItemId?: string;
  onItemClick: (item: NavigationItem) => void;
  className?: string;
} 