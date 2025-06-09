import { styled } from '@mui/material/styles';
import { Paper, IconButton } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -19,
  top: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  zIndex: 1,
}));

export const Content = styled('div')(() => ({
  flexGrow: 1,
  flexShrink: 1,
  flex: 1,
  minHeight: 0,
  height: '100%',
  width: '98%',
  display: 'flex',
  flexDirection: 'column',
})); 