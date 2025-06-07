import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { SidebarProps } from './types';
import { SidebarContainer, ToggleButton } from './styles';

export const Sidebar = ({ children, isExpanded, onToggle }: SidebarProps) => {
  const { t } = useTranslation('sidebar');

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      role="navigation"
      aria-label={t('sidebar.navigation')}
    >
      <ToggleButton
        onClick={onToggle}
        aria-label={isExpanded ? t('sidebar.collapse') : t('sidebar.expand')}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
      </ToggleButton>
      {children}
    </SidebarContainer>
  );
};
