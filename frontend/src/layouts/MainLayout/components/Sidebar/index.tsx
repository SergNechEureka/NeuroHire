import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { NavigationMenu } from '../NavigationMenu';
import { StyledPaper, ToggleButton, Content } from './styles';
import type { SidebarProps } from './types';

export const Sidebar = ({
  mode,
  navigationItems,
  onModeChange,
  activeItemId,
  onItemClick,
  className,
}: SidebarProps) => {
  const { t } = useTranslation('sidebar');

  const handleToggle = () => {
    onModeChange(mode === 'normal' ? 'compact' : 'normal');
  };

  return (
    <StyledPaper
      elevation={0}
      className={className}
      sx={{
        width: mode === 'normal' ? 280 : 72,
      }}
    >
      <ToggleButton
        onClick={handleToggle}
        aria-label={mode === 'normal' ? t('collapse') : t('expand')}
        size="small"
      >
        {mode === 'normal' ? <ChevronLeft /> : <ChevronRight />}
      </ToggleButton>

      <Content>
        <NavigationMenu
          items={navigationItems}
          mode={mode}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
        />
      </Content>
    </StyledPaper>
  );
};
