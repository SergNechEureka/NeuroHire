import { useTranslation } from 'react-i18next';
import type { HeaderProps } from './types';
import { HeaderContainer, Title, RightContent, SearchInput } from './styles';

export const Header = ({ title, rightContent, onSearch }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      {title && <Title>{title}</Title>}
      {onSearch && (
        <SearchInput
          type="text"
          placeholder={t('search')}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      <RightContent>{rightContent}</RightContent>
    </HeaderContainer>
  );
};
