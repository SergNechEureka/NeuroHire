import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Storage as StorageIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { NavigationMenuProps } from '../../types';
import {
  StyledList,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  StyledCollapse,
} from './styles';

export const NavigationMenu = ({ isExpanded }: NavigationMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mainOpen, setMainOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleMainClick = () => setMainOpen(!mainOpen);
  const handleAdminClick = () => setAdminOpen(!adminOpen);

  const menuItems = [
    {
      title: t('navigation.main.title'),
      icon: <WorkIcon />,
      open: mainOpen,
      onClick: handleMainClick,
      items: [
        { text: t('navigation.main.candidates'), icon: <PeopleIcon />, path: '/candidates' },
        { text: t('navigation.main.projects'), icon: <WorkIcon />, path: '/projects' },
        {
          text: t('navigation.main.applications'),
          icon: <AssignmentIcon />,
          path: '/applications',
        },
      ],
    },
    {
      title: t('navigation.administration.title'),
      icon: <PersonIcon />,
      open: adminOpen,
      onClick: handleAdminClick,
      items: [
        { text: t('navigation.administration.users'), icon: <PersonIcon />, path: '/users' },
        { text: t('navigation.administration.database'), icon: <StorageIcon />, path: '/database' },
      ],
    },
  ];

  return (
    <StyledList>
      {menuItems.map((section) => (
        <div key={section.title}>
          <StyledListItem button onClick={section.onClick}>
            <StyledListItemIcon>{section.icon}</StyledListItemIcon>
            {isExpanded && (
              <>
                <StyledListItemText primary={section.title} />
                {section.open ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </StyledListItem>
          {isExpanded && (
            <StyledCollapse in={section.open} timeout="auto" unmountOnExit>
              <StyledList component="div" disablePadding>
                {section.items.map((item) => (
                  <StyledListItem
                    key={item.text}
                    button
                    onClick={() => navigate(item.path)}
                    sx={{ pl: 4 }}
                  >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    <StyledListItemText primary={item.text} />
                  </StyledListItem>
                ))}
              </StyledList>
            </StyledCollapse>
          )}
        </div>
      ))}
    </StyledList>
  );
};
