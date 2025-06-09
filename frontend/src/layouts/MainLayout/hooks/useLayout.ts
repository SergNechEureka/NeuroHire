import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { NavigationItem } from '../components/NavigationMenu/types';
import type { SidebarMode } from '../components/Sidebar/types';

interface UseLayoutProps {
  defaultMode?: SidebarMode;
  onModeChange?: (mode: SidebarMode) => void;
  navigationItems?: NavigationItem[];
}

interface UseLayoutReturn {
  mode: SidebarMode;
  isMobileMenuOpen: boolean;
  activeItem: NavigationItem | null;
  handleModeChange: (mode: SidebarMode) => void;
  handleMobileMenuToggle: () => void;
  handleItemClick: (item: NavigationItem) => void;
}

function findMenuItemByPath(items: NavigationItem[], path: string): NavigationItem | null {
  for (const item of items) {
    if (item.path === path) return item;
    if (item.children) {
      const found = findMenuItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
}

export const useLayout = ({ defaultMode = 'normal', onModeChange, navigationItems = [] }: UseLayoutProps = {}): UseLayoutReturn => {
  const [mode, setMode] = useState<SidebarMode>(defaultMode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavigationItem | null>(null);
  const location = useLocation();

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

  // Синхронизация activeItem с текущим маршрутом
  useEffect(() => {
    if (!navigationItems.length) return;
    const found = findMenuItemByPath(navigationItems, location.pathname);
    setActiveItem(found);
  }, [location.pathname, navigationItems]);

  return {
    mode,
    isMobileMenuOpen,
    activeItem,
    handleModeChange,
    handleMobileMenuToggle,
    handleItemClick
  };
}; 