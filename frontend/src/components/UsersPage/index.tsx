import { useTranslation } from 'react-i18next';
import { BasePage } from '../BasePage';

export const UsersPage = () => {
  const { t } = useTranslation();

  return <BasePage title={t('pages.users.title')}>{'Add users content here'}</BasePage>;
};
