import type { SidebarMode } from '../Sidebar/types';

export interface HeaderProps {
  onMenuClick: () => void;
  onModeChange: (mode: SidebarMode) => void;
  currentMode: SidebarMode;
  className?: string;
} 