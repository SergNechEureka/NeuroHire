import { useTranslation } from 'react-i18next';
import type { MobileNavigationProps } from './types';
import {
  MobileNavContainer,
  MobileNavList,
  MobileNavItem,
  MobileNavButton,
  IconWrapper,
} from './styles';

export const MobileNavigation = ({ items, onNavigate, currentPath }: MobileNavigationProps) => {
  const { t } = useTranslation();

  return (
    <MobileNavContainer>
      <MobileNavList>
        {items.map((item) => (
          <MobileNavItem key={item.id}>
            <MobileNavButton
              isActive={currentPath === item.path}
              onClick={() => onNavigate(item.path)}
              aria-label={t(`navigation.${item.id}`, item.id)}
            >
              <IconWrapper>{item.icon}</IconWrapper>
              {/* Можно добавить подпись, если нужно: */}
              {/* <span>{t(`navigation.${item.id}`, item.id)}</span> */}
            </MobileNavButton>
          </MobileNavItem>
        ))}
      </MobileNavList>
    </MobileNavContainer>
  );
};
