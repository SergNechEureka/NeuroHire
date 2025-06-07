import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { SidebarProps } from './types';
import { SidebarContainer, ToggleButton } from './styles';

export const Sidebar = ({ children, isExpanded, onToggle }: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <ToggleButton
        onClick={onToggle}
        aria-label={isExpanded ? t('toggle.collapse') : t('toggle.expand')}
      >
        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
      </ToggleButton>
      {children}
    </SidebarContainer>
  );
};
