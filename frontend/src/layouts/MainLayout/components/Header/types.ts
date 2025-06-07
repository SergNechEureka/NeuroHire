import type { ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  rightContent?: ReactNode;
  onSearch?: (query: string) => void;
} 