import { useTranslation } from "react-i18next";
import { LANGUAGES } from "./languages";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      {LANGUAGES.map(lang =>
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      )}
    </select>
  );
};

export default LanguageSwitcher;