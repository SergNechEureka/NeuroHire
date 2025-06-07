import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

export const MobileNavContainer = styled(Box)({
  width: 250,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const MobileNavHeader = styled(Box)({
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

export const CloseButton = styled(IconButton)({
  marginLeft: 'auto',
});

export const MobileNavContent = styled(Box)({
  flex: 1,
  overflow: 'auto',
}); 