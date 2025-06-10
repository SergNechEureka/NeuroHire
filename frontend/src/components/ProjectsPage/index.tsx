import { useTranslation } from 'react-i18next';
import { BasePage } from 'api./BasePage';

export const ProjectsPage = () => {
  const { t } = useTranslation();

  return <BasePage title={t('pages.projects.title')}>{'Add projects content here'}</BasePage>;
};
