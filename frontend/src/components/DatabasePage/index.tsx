import { useTranslation } from 'react-i18next';
import { BasePage } from '../BasePage';

export const DatabasePage = () => {
  const { t } = useTranslation();

  return <BasePage title={t('pages.database.title')}>{'Add database content here'}</BasePage>;
};
