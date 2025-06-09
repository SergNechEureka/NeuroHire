import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { NavigationMenu } from '../NavigationMenu';
import { StyledDrawer, CloseButton } from './styles';
import type { MobileNavigationProps } from './types';
import type { NavigationItem } from '../NavigationMenu/types';

export const MobileNavigation = ({
  isOpen,
  onClose,
  navigationItems,
  activeItemId,
  onItemClick,
}: MobileNavigationProps) => {
  const { t } = useTranslation('mobileNavigation');

  const handleItemClick = (item: NavigationItem) => {
    onItemClick(item);
    onClose();
  };

  return (
    <StyledDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <Box sx={{ p: 2, pt: 8 }}>
        <CloseButton onClick={onClose} aria-label={t('close')} size="large">
          <CloseIcon />
        </CloseButton>

        <Typography variant="h6" component="h2" sx={{ mb: 2, px: 2 }}>
          {t('navigation')}
        </Typography>

        <NavigationMenu
          menuItems={navigationItems}
          mode="normal"
          activeItemId={activeItemId}
          onItemClick={handleItemClick}
        />
      </Box>
    </StyledDrawer>
  );
};
