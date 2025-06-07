import { useState, useCallback } from 'react';
import type { NavigationItem } from '../components/NavigationMenu/types';
import type { SidebarMode } from '../components/Sidebar/types';

interface UseLayoutProps {
  defaultMode?: SidebarMode;
  onModeChange?: (mode: SidebarMode) => void;
}

interface UseLayoutReturn {
  mode: SidebarMode;
  isMobileMenuOpen: boolean;
  activeItem: NavigationItem | null;
  handleModeChange: (mode: SidebarMode) => void;
  handleMobileMenuToggle: () => void;
  handleItemClick: (item: NavigationItem) => void;
}

export const useLayout = ({ defaultMode = 'normal', onModeChange }: UseLayoutProps = {}): UseLayoutReturn => {
  const [mode, setMode] = useState<SidebarMode>(defaultMode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavigationItem | null>(null);

  const handleModeChange = useCallback((newMode: SidebarMode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  }, [onModeChange]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleItemClick = useCallback((item: NavigationItem) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  }, []);

  return {
    mode,
    isMobileMenuOpen,
    activeItem,
    handleModeChange,
    handleMobileMenuToggle,
    handleItemClick
  };
}; 