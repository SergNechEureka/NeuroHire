import styled from '@emotion/styled';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const MobileNavContainer = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  animation: ${slideUp} 0.3s ease;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

export const StyledBottomNavigation = styled(BottomNavigation)`
  height: 56px;
  background-color: #ffffff;
`;

export const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  min-width: 64px;
  
  &.Mui-selected {
    color: #1976d2;
  }
  
  .MuiBottomNavigationAction-label {
    font-size: 0.75rem;
    margin-top: 4px;
  }
`; 