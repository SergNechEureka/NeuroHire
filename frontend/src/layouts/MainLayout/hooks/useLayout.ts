import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { NavigationItem } from 'api./components/NavigationMenu/types';
import type { SidebarMode } from 'api./components/Sidebar/types';

interface UseLayoutProps {
  defaultMode?: SidebarMode;
  onModeChange?: (mode: SidebarMode) => void;
  navigationItems?: NavigationItem[];
}

interface UseLayoutReturn {
  mode: SidebarMode;
  isMobileMenuOpen: boolean;
  activeItem: NavigationItem | null;
  expandedItemId: string | null;
  handleModeChange: (mode: SidebarMode) => void;
  handleMobileMenuToggle: () => void;
  handleItemClick: (item: NavigationItem) => void;
  handleExpandItem: (itemId: string) => void;
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

function findMainMenuItem(menuItems: NavigationItem[]): NavigationItem | null {
  const mainMenuItem = menuItems.find(menuItem => menuItem.isMainItem);
  return mainMenuItem || null;
}

function findFirstChildItem(menuItem: NavigationItem): NavigationItem | null {
  if (!menuItem.children || menuItem.children.length === 0) return null;
  const firstChild = menuItem.children[0];
  return firstChild ?? null;
}

export const useLayout = ({ defaultMode = 'normal', onModeChange, navigationItems = [] }: UseLayoutProps = {}): UseLayoutReturn => {
  const [mode, setMode] = useState<SidebarMode>(defaultMode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavigationItem | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleModeChange = useCallback((newMode: SidebarMode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  }, [onModeChange]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleExpandItem = useCallback((itemId: string) => {
    setExpandedItemId(prev => prev === itemId ? null : itemId);
  }, []);

  const handleItemClick = useCallback((item: NavigationItem) => {
    // Если это главный пункт меню, только разворачиваем/сворачиваем
    if (item.isMainItem) {
      handleExpandItem(item.id);
      return;
    }
    // Если у пункта есть path, делаем переход
    if (item.path) {
      navigate(item.path);
    }
    setActiveItem(item);
    setIsMobileMenuOpen(false);
  }, [handleExpandItem, navigate]);

  // Инициализация после логина
  useEffect(() => {
    if (!navigationItems.length) return;

    // Находим главный пункт меню
    const mainItem = findMainMenuItem(navigationItems);

    if (mainItem) {
      // Разворачиваем главный пункт
      setExpandedItemId(mainItem.id);
      
      // Активируем первый подпункт
      const firstChild = findFirstChildItem(mainItem);
      
      if (firstChild) {
        setActiveItem(firstChild);
      }
    }
  }, [navigationItems]);

  // Синхронизация activeItem с текущим маршрутом
  useEffect(() => {
    if (!navigationItems.length) return;
    const found = findMenuItemByPath(navigationItems, location.pathname);
    if (found) {
      setActiveItem(found);
      // Находим родительский пункт и разворачиваем его
      const parentItem = navigationItems.find(item => 
        item.children?.some(child => child.id === found.id)
      );
      if (parentItem) {
        setExpandedItemId(parentItem.id);
      }
    }
  }, [location.pathname, navigationItems]);

  return {
    mode,
    isMobileMenuOpen,
    activeItem,
    expandedItemId,
    handleModeChange,
    handleMobileMenuToggle,
    handleItemClick,
    handleExpandItem
  };
}; 