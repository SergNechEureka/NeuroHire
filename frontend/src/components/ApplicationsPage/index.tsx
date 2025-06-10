import { useTranslation } from 'react-i18next';
import { BasePage } from '../BasePage';

export const ApplicationsPage = () => {
  const { t } = useTranslation();

  return (
    <BasePage title={t('pages.applications.title')}>{'Add applications content here'}</BasePage>
  );
};
