import { useState, useCallback } from 'react';
import { Search as SearchIcon, AccountCircle, Settings, Logout } from '@mui/icons-material';
import type { HeaderProps } from './types';
import {
  StyledAppBar,
  StyledToolbar,
  Title,
  SearchContainer,
  SearchInput,
  ActionsContainer,
  UserAvatar,
  StyledMenu,
  StyledMenuItem,
} from './styles';

export const Header = ({
  title,
  searchPlaceholder = 'Search...',
  onSearch,
  actions,
  userMenu,
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        {title && <Title>{title}</Title>}

        {onSearch && (
          <SearchContainer>
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon sx={{ color: '#666', mr: 1 }} />}
            />
          </SearchContainer>
        )}

        {actions && <ActionsContainer>{actions}</ActionsContainer>}

        {userMenu && (
          <>
            <UserAvatar src={userMenu.avatar} alt={userMenu.name} onClick={handleUserMenuOpen}>
              {!userMenu.avatar && <AccountCircle />}
            </UserAvatar>

            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {userMenu.name && <StyledMenuItem disabled>{userMenu.name}</StyledMenuItem>}

              {userMenu.onProfileClick && (
                <StyledMenuItem onClick={userMenu.onProfileClick}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </StyledMenuItem>
              )}

              {userMenu.onSettingsClick && (
                <StyledMenuItem onClick={userMenu.onSettingsClick}>
                  <Settings sx={{ mr: 1 }} />
                  Settings
                </StyledMenuItem>
              )}

              {userMenu.onLogout && (
                <StyledMenuItem onClick={userMenu.onLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </StyledMenuItem>
              )}
            </StyledMenu>
          </>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};
