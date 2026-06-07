import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import en from "../config/locales/en/translation.json";
import ru from "../config/locales/ru/translation.json";
import uz from "../config/locales/uz/translation.json";

const defaultLanguage =
  typeof window !== "undefined"
    ? localStorage.getItem("lang") || "en"
    : "en";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en},
            uz: { translation: uz},
            ru: { translation: ru},
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        }
    })


export default i18n;