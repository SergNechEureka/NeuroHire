import type { ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  userMenu?: {
    avatar?: string;
    name?: string;
    onLogout?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
  };
} 