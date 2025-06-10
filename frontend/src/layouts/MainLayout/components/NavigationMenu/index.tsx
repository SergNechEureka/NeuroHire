import { useState, useEffect } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  StyledList,
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  StyledListItemText,
  StyledCollapse,
} from './styles';
import type { NavigationMenuProps, NavigationItem } from './types';

export const NavigationMenu = ({
  menuItems = [],
  mode,
  activeItemId,
  onItemClick,
  className,
  defaultExpandedItemId,
}: NavigationMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Инициализация развернутого состояния
  useEffect(() => {
    if (defaultExpandedItemId) {
      setExpandedItems((prev) => ({
        api..prev,
        [defaultExpandedItemId]: true,
      }));
    } else if (menuItems.length > 0) {
      const mainItem = menuItems.find((item) => item.isMainItem);
      if (mainItem) {
        setExpandedItems((prev) => ({
          api..prev,
          [mainItem.id]: true,
        }));
      }
    }
  }, [defaultExpandedItemId, menuItems]);

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      // Если это главный пункт меню, только разворачиваем/сворачиваем
      if (item.isMainItem) {
        setExpandedItems((prev) => ({
          api..prev,
          [item.id]: !prev[item.id],
        }));
        return;
      }
    }
    onItemClick(item);
  };

  const renderMenuItem = (item: NavigationItem) => {
    const isExpanded = expandedItems[item.id];
    const isActive = activeItemId === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <StyledListItem key={item.id} disablePadding>
        <StyledListItemButton
          selected={isActive}
          onClick={() => handleItemClick(item)}
          sx={{
            justifyContent: mode === 'compact' ? 'center' : 'flex-start',
            minHeight: 48,
            opacity: item.isMainItem ? 1 : 0.8,
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <StyledListItemIcon>{item.icon}</StyledListItemIcon>
          {mode === 'normal' && (
            <>
              <StyledListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: item.isMainItem ? 'bold' : 'normal',
                }}
              />
              {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
            </>
          )}
        </StyledListItemButton>
        {hasChildren && mode === 'normal' && item.children && (
          <StyledCollapse in={isExpanded} timeout="auto" unmountOnExit>
            <StyledList disablePadding>
              {item.children.map((child) => renderMenuItem(child))}
            </StyledList>
          </StyledCollapse>
        )}
      </StyledListItem>
    );
  };

  return (
    <StyledList className={className}>{menuItems.map((item) => renderMenuItem(item))}</StyledList>
  );
};
