import type { ReactElement } from 'react';
import type { NavigationItem } from './components/NavigationMenu/types';
import type { SidebarMode } from './components/Sidebar/types';

export type MainLayoutProps = {
  children: ReactElement<{ activeMenuItem?: NavigationItem | null }>;
  navigationItems: NavigationItem[];
  defaultMode?: SidebarMode;
  onModeChange?: (mode: SidebarMode) => void;
  title?: string;
  className?: string;
  showHeader?: boolean;
};

export interface LayoutState {
  mode: SidebarMode;
  isMobileMenuOpen: boolean;
  activeItem: NavigationItem | null;
}

export interface LayoutActions {
  handleModeChange: (mode: SidebarMode) => void;
  handleMobileMenuToggle: () => void;
  handleItemClick: (item: NavigationItem) => void;
} 