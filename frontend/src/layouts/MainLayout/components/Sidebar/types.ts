import type { ReactNode } from 'react';

export interface SidebarProps {
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
} 