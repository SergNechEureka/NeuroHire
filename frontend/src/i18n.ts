import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "./languages";

const resources: any = {};
LANGUAGES.forEach(lang => {
  resources[lang.code] = { translation: lang.resource };
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;