import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Root = styled(Box)({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

export const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10),
})); 