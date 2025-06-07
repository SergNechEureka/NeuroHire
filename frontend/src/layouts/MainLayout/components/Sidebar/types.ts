import type { ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { NavigationItem } from '../NavigationMenu/types';

export type SidebarMode = 'normal' | 'compact';

export interface SidebarProps {
  children: ReactNode;
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
  css?: SerializedStyles | SerializedStyles[];
  className?: string;
} 