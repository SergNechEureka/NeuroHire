import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const SidebarContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const SidebarHeader = styled(Box)({
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const ToggleButton = styled(IconButton)({
  marginLeft: 'auto',
});

export const SidebarContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
}); 