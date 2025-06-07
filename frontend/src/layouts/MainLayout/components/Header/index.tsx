import { Menu as MenuIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, MenuButton, Title } from './styles';
import type { HeaderProps } from './types';

export const Header = ({ onMenuClick, title, className }: HeaderProps) => {
  const { t } = useTranslation('header');

  return (
    <StyledAppBar position="fixed" className={className}>
      <MenuButton color="inherit" aria-label={t('menu')} onClick={onMenuClick} edge="start">
        <MenuIcon />
      </MenuButton>
      <Title variant="h6" noWrap>
        {title || t('title')}
      </Title>
    </StyledAppBar>
  );
};
