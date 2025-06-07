import styled from '@emotion/styled';
import { AppBar, Toolbar, InputBase, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
  color: #333333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  z-index: 1100;
`;

export const StyledToolbar = styled(Toolbar)`
  padding: 0 16px;
  min-height: 64px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333333;
  animation: ${fadeIn} 0.3s ease;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin: 0 16px;
  flex-grow: 1;
  max-width: 400px;
`;

export const SearchInput = styled(InputBase)`
  width: 100%;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #eeeeee;
  }

  &:focus-within {
    background-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;

export const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    min-width: 200px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  padding: 8px 16px;
  font-size: 0.875rem;
  
  &:hover {
    background-color: #f5f5f5;
  }
`; 