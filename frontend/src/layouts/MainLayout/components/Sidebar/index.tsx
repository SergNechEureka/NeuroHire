import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { SidebarProps } from '../../types';
import { SidebarContainer, SidebarHeader, ToggleButton, SidebarContent } from './styles';

interface ExtendedSidebarProps extends SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ isExpanded, onToggle, children }: ExtendedSidebarProps) => {
  const { t } = useTranslation();

  return (
    <SidebarContainer>
      <SidebarHeader>
        <ToggleButton
          onClick={onToggle}
          aria-label={isExpanded ? t('sidebar.collapse') : t('sidebar.expand')}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </ToggleButton>
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};
