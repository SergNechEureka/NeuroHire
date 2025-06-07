import { ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
}

export interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export interface NavigationMenuProps {
  isExpanded: boolean;
}

export interface HeaderProps {
  onMenuClick: () => void;
}

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export type SidebarState = 'expanded' | 'collapsed'; 