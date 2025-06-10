import type { NavigationItem } from '../NavigationMenu/types';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  activeItemId?: string;
  onItemClick: (item: NavigationItem) => void;
} 