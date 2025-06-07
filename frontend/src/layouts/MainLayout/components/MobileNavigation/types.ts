import type { ReactNode } from 'react';

export interface MobileNavigationProps {
  items: Array<{
    id: string;
    icon: ReactNode;
    path: string;
  }>;
  onNavigate: (path: string) => void;
  currentPath: string;
} 