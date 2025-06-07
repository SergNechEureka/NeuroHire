import { useTranslation } from 'react-i18next';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { IconButton, InputBase } from '@mui/material';
import { HeaderProps } from '../../types';
import {
  StyledAppBar,
  StyledToolbar,
  SearchContainer,
  SearchInput,
  ActionsContainer,
} from './styles';

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <SearchContainer>
          <SearchIcon
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
          />
          <SearchInput placeholder={t('header.search')} inputProps={{ 'aria-label': 'search' }} />
        </SearchContainer>

        <ActionsContainer>
          <IconButton color="inherit" aria-label={t('header.profile')}>
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" aria-label={t('header.settings')}>
            <SettingsIcon />
          </IconButton>
          <IconButton color="inherit" aria-label={t('header.logout')}>
            <LogoutIcon />
          </IconButton>
        </ActionsContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};
