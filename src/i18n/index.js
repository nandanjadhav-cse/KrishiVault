import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './languages';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import as from './locales/as.json';
import bn from './locales/bn.json';
import brx from './locales/brx.json';
import doi from './locales/doi.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ks from './locales/ks.json';
import gom from './locales/gom.json';
import mai from './locales/mai.json';
import ml from './locales/ml.json';
import mni from './locales/mni.json';
import ne from './locales/ne.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import sa from './locales/sa.json';
import sat from './locales/sat.json';
import sd from './locales/sd.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ur from './locales/ur.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  as: { translation: as },
  bn: { translation: bn },
  brx: { translation: brx },
  doi: { translation: doi },
  gu: { translation: gu },
  kn: { translation: kn },
  ks: { translation: ks },
  gom: { translation: gom },
  mai: { translation: mai },
  ml: { translation: ml },
  mni: { translation: mni },
  ne: { translation: ne },
  or: { translation: or },
  pa: { translation: pa },
  sa: { translation: sa },
  sat: { translation: sat },
  sd: { translation: sd },
  ta: { translation: ta },
  te: { translation: te },
  ur: { translation: ur },
};

const savedLang = localStorage.getItem('krishi_vault_lang') || DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const updateDocumentDirection = (langCode) => {
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  const dir = langConfig?.dir || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', langCode);
};

// Initial document direction set
updateDocumentDirection(savedLang);

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('krishi_vault_lang', lng);
  updateDocumentDirection(lng);
});

export default i18n;
