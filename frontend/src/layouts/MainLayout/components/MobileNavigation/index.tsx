import { useTranslation } from 'react-i18next';
import { Close as CloseIcon } from '@mui/icons-material';
import { MobileNavigationProps } from '../../types';
import { NavigationMenu } from '../NavigationMenu';
import { MobileNavContainer, MobileNavHeader, CloseButton, MobileNavContent } from './styles';

export const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { t } = useTranslation();

  return (
    <MobileNavContainer>
      <MobileNavHeader>
        <CloseButton onClick={onClose} aria-label={t('mobile.close')}>
          <CloseIcon />
        </CloseButton>
      </MobileNavHeader>
      <MobileNavContent>
        <NavigationMenu isExpanded={true} />
      </MobileNavContent>
    </MobileNavContainer>
  );
};
