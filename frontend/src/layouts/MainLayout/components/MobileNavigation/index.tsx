import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { NavigationMenu } from 'api./NavigationMenu';
import { StyledDrawer, CloseButton, DrawerContent } from './styles';
import type { MobileNavigationProps } from './types';
import type { NavigationItem } from 'api./NavigationMenu/types';

export const MobileNavigation = ({
  isOpen,
  onClose,
  navigationItems,
  activeItemId,
  onItemClick,
}: MobileNavigationProps) => {
  const { t } = useTranslation('mobileNavigation');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemClick = (item: NavigationItem) => {
    onItemClick(item);
    onClose();
  };

  return (
    <StyledDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // Better mobile performance
        disableScrollLock: false, // Prevent background scrolling when drawer is open
      }}
      SlideProps={{
        onTouchStart: (e) => {
          if (!e.touches?.[0]) return;
          const touch = e.touches[0];
          const startX = touch.clientX;
          const handleTouchMove = (moveEvent: TouchEvent) => {
            if (!moveEvent.touches?.[0]) return;
            const moveX = moveEvent.touches[0].clientX;
            const diff = startX - moveX;
            if (diff > 100) {
              // If swiped left more than 100px
              onClose();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          document.addEventListener('touchmove', handleTouchMove);
          document.addEventListener(
            'touchend',
            () => {
              document.removeEventListener('touchmove', handleTouchMove);
            },
            { once: true },
          );
        },
      }}
    >
      <DrawerContent>
        <CloseButton
          onClick={onClose}
          aria-label={t('close')}
          size="large"
          sx={{
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}
        >
          <CloseIcon />
        </CloseButton>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 2,
            px: 2,
            pt: isSmallScreen ? 6 : 4,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {t('navigation')}
        </Typography>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <NavigationMenu
            menuItems={navigationItems}
            mode="normal"
            activeItemId={activeItemId}
            onItemClick={handleItemClick}
          />
        </Box>
      </DrawerContent>
    </StyledDrawer>
  );
};
