import { useTranslation } from 'react-i18next';
import { BasePage } from '../BasePage';

export const CandidatesPage = () => {
  const { t } = useTranslation();

  return <BasePage title={t('pages.candidates.title')}>{'Add candidates content here'}</BasePage>;
};
