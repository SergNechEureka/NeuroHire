import type { SidebarMode } from '../Sidebar/types';

export interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onModeChange?: (mode: SidebarMode) => void;
  currentMode?: SidebarMode;
  className?: string;
} 