import { useTranslation } from 'react-i18next';
import { BasePage } from '../BasePage';

export const AdministrationPage = () => {
  const { t } = useTranslation();

  return (
    <BasePage title={t('pages.administration.title')}>{'Add administration content here'}</BasePage>
  );
};
