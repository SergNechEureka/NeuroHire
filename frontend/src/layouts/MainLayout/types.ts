import type { ReactNode } from 'react';
import type { NavigationItem } from './components/NavigationMenu/types';
import type { SidebarMode } from './components/Sidebar/types';

export interface MainLayoutProps {
  children: ReactNode;
  navigationItems: NavigationItem[];
  defaultMode?: SidebarMode;
  onModeChange?: (mode: SidebarMode) => void;
  title?: string;
  className?: string;
} 