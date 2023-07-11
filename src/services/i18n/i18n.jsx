import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const i18nSkeleton = i18next.createInstance();
i18nSkeleton
  .use(Backend)
  .use(LanguageDetector)
  .init(
    {
      fallbackLng: 'en',
      ns: ['reactSkeleton'],
      defaultNS: 'reactSkeleton',
      debug: true
    },
    (err, t) => {
      if (err) return console.error('something went wrong loading', err);
      t('key');
    }
  );

export default i18nSkeleton;
