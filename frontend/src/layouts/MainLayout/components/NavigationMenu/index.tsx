import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tooltip, IconButton } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import type { NavigationMenuProps, MenuItemProps } from './types';
import {
  MenuContainer,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  NestedList,
  ExpandIcon,
} from './styles';

const MenuItemComponent = ({
  item,
  isExpanded,
  isActive,
  onItemClick,
  level = 0,
}: MenuItemProps) => {
  const [isNestedExpanded, setIsNestedExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const { t } = useTranslation('navigationMenu');

  const handleClick = () => {
    if (hasChildren) {
      setIsNestedExpanded(!isNestedExpanded);
    } else {
      onItemClick(item.path);
    }
  };

  const menuItem = (
    <MenuItem
      key={item.id}
      onClick={handleClick}
      selected={isActive}
      level={level}
      sx={{
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
        '&:hover': {
          backgroundColor: isActive ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <MenuItemIcon>
        {item.icon}
        {hasChildren && (
          <ExpandIcon isExpanded={isNestedExpanded}>
            <KeyboardArrowRight />
          </ExpandIcon>
        )}
      </MenuItemIcon>
      <MenuItemText primary={item.title} isExpanded={isExpanded} />
    </MenuItem>
  );

  return (
    <>
      {!isExpanded && item.tooltip ? (
        <Tooltip title={item.tooltip} placement="right" arrow>
          {menuItem}
        </Tooltip>
      ) : (
        menuItem
      )}

      {hasChildren && (
        <NestedList in={isNestedExpanded && isExpanded}>
          {item.children!.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              isExpanded={isExpanded}
              isActive={isActive}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </NestedList>
      )}
    </>
  );
};

export const NavigationMenu = ({ items, isExpanded, onItemClick }: NavigationMenuProps) => {
  const location = useLocation();
  const { t } = useTranslation('navigationMenu');

  return (
    <MenuContainer isExpanded={isExpanded} role="navigation" aria-label={t('navigation.menu')}>
      {items.map((item) => (
        <MenuItemComponent
          key={item.id}
          item={item}
          isExpanded={isExpanded}
          isActive={location.pathname === item.path}
          onItemClick={onItemClick}
        />
      ))}
    </MenuContainer>
  );
};
