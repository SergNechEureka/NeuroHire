import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';

export const StyledList = styled(List)({
  padding: 0,
});

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 40,
});

export const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
  },
});

export const StyledCollapse = styled(Collapse)({
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
}); 