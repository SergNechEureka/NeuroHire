import { Menu as MenuIcon, ViewSidebar as ViewSidebarIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, MenuButton, Title, ModeButton } from './styles';
import type { HeaderProps } from './types';

export const Header = ({
  title,
  onMenuClick,
  onModeChange,
  currentMode,
  className,
}: HeaderProps) => {
  const { t } = useTranslation('header');

  return (
    <StyledAppBar position="fixed" className={className}>
      <MenuButton color="inherit" aria-label={t('menu')} onClick={onMenuClick} edge="start">
        <MenuIcon />
      </MenuButton>
      <Title variant="h6" noWrap>
        {title || t('title')}
      </Title>
      <ModeButton
        color="inherit"
        onClick={() =>
          onModeChange && onModeChange(currentMode === 'normal' ? 'compact' : 'normal')
        }
        aria-label={t('toggleMode')}
      >
        <ViewSidebarIcon />
      </ModeButton>
    </StyledAppBar>
  );
};
