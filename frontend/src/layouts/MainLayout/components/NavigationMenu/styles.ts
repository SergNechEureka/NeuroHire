import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiListItem-root': {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(0.5),
    width: '100%',
    display: 'block',
  },
}));

export const StyledListItem = styled(ListItem)({
  padding: 0,
  width: '100%',
  display: 'block',
});

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(4),
  color: theme.palette.text.secondary,
  '.Mui-selected &': {
    color: theme.palette.primary.main,
  },
}));

export const StyledListItemText = styled(ListItemText)({
  margin: 0,
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
});

export const StyledCollapse = styled(Collapse)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  width: '100%',
  '& .MuiList-root': {
    width: '100%',
    display: 'block',
    marginTop: theme.spacing(0.5),
  },
})); 