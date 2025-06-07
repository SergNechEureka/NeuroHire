import { useState, useEffect } from 'react';
import { SidebarState } from '../types';

const SIDEBAR_STATE_KEY = 'sidebarState';

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return savedState ? savedState === 'expanded' : true;
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, newState ? 'expanded' : 'collapsed');
  };

  return {
    isExpanded,
    isMobile,
    toggleSidebar,
  };
}; 