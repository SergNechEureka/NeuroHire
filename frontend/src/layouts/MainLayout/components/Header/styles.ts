import { styled } from '@mui/material/styles';
import { AppBar, IconButton, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const ModeButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  fontWeight: 500,
})); 