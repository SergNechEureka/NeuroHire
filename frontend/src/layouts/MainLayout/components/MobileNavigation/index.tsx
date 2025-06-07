import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { MobileNavigationProps } from './types';
import { MobileNavContainer, StyledBottomNavigation, StyledBottomNavigationAction } from './styles';

export const MobileNavigation = ({ items, onItemClick, currentPath }: MobileNavigationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('mobileNavigation');

  if (!isMobile) {
    return null;
  }

  return (
    <MobileNavContainer elevation={3} role="navigation" aria-label={t('navigation.menu')}>
      <StyledBottomNavigation
        value={currentPath}
        onChange={(_, newValue) => onItemClick(newValue)}
        showLabels
      >
        {items.map((item) => (
          <StyledBottomNavigationAction
            key={item.id}
            label={item.title}
            value={item.path}
            icon={item.icon}
            aria-label={item.title}
          />
        ))}
      </StyledBottomNavigation>
    </MobileNavContainer>
  );
};
