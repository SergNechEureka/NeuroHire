import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

export const LayoutContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
});

export const MainContent = styled(Box)({
  flexGrow: 1,
  padding: '24px',
  transition: 'margin 0.2s ease-in-out',
});

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 260,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 260,
    boxSizing: 'border-box',
    transition: 'width 0.2s ease-in-out',
  },
  '&.collapsed': {
    width: 64,
    '& .MuiDrawer-paper': {
      width: 64,
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const MobileDrawer = styled(Drawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
})); 