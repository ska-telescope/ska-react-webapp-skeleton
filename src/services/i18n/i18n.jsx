import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import moment from 'moment';
import langAF from './locales/en/reactSkeleton.json';
import langEN from './locales/en/reactSkeleton.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      af: {
        translation: langAF
      },
      en: {
        translation: langEN
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (value instanceof Date) {
          return moment(value).format(format);
        }
        if (typeof value === 'number') {
          return new Intl.NumberFormat().format(value);
        }
        return typeof value;
      }
    }
  });

/*
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        "language": "English",
        "date_format_one": "{{-date, YYYY/MM/DD}}",
        "date_format_two": "{{date, DD-MM-YYYY}}",
        "dummy": "I am in ENGLISH translation file only",
        "intlNumber": "{{val, number}}",
        "label": {
          "button": {
            "telescopeToggle": "Telescope Toggle"
          },
          "number": "Number Label",
          "text": "Text Label"
        },
        "toolTip": {
          "button": {
            "mode": "Colour Mode Toggle",
            "skao": "SKAO WebSite",
            "telescopeToggle": "Switch between available telescopes"
          }
        }
      }
      
    },
    // backend: {
    //   loadPath: './src/services/i18n/locales/{{lng}}/{{ns}}.json'
    // },
    fallbackLng: 'en',
    lng: 'en',
    // ns: ['reactSkeleton'],
    // defaultNS: 'reactSkeleton',
    initImmediate: false,
    useSuspense: true,
    debug: true,
    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (value instanceof Date) {
          return moment(value).format(format);
        }
        if (typeof value === 'number') {
          return new Intl.NumberFormat().format(value);
        }
        return typeof value;
      }
    }
  });
  */

export default i18n;
