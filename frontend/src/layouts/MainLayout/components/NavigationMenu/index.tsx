import { useTranslation } from 'react-i18next';
import type { NavigationMenuProps } from './types';
import { MenuContainer, MenuList, MenuItem, MenuButton, IconWrapper, Title } from './styles';

export const NavigationMenu = ({ items, isExpanded, onNavigate }: NavigationMenuProps) => {
  const { t } = useTranslation();

  const renderMenuItem = (item: NavigationMenuProps['items'][0]) => (
    <MenuItem key={item.id} isExpanded={isExpanded}>
      <MenuButton
        isExpanded={isExpanded}
        onClick={() => onNavigate(item.path)}
        aria-label={t(`navigation.${item.id}`)}
      >
        <IconWrapper isExpanded={isExpanded}>{item.icon}</IconWrapper>
        <Title isExpanded={isExpanded}>{t(`navigation.${item.id}`)}</Title>
      </MenuButton>
    </MenuItem>
  );

  return (
    <MenuContainer>
      <MenuList>{items.map(renderMenuItem)}</MenuList>
    </MenuContainer>
  );
};
