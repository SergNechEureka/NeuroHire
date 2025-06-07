import { useState } from 'react';
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
  items,
  mode,
  activeItemId,
  onItemClick,
  className,
}: NavigationMenuProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      setExpandedItems((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
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
          }}
        >
          <StyledListItemIcon>{item.icon}</StyledListItemIcon>
          {mode === 'normal' && (
            <>
              <StyledListItemText primary={item.label} />
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

  return <StyledList className={className}>{items.map((item) => renderMenuItem(item))}</StyledList>;
};
