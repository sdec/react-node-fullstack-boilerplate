import nlLocaleData from 'react-intl/locale-data/nl';
import nlMessages from './../core/i18n/Dutch';

import enLocaleData from 'react-intl/locale-data/en';
import enMessages from './../core/i18n/English';

export const locales = [
  {
    locale: 'nl',
    name: 'Nederlands',
    buttonText: 'Doorgaan in het nederlands',
    localeData: nlLocaleData,
    messages: nlMessages
  },
  {
    locale: 'en',
    name: 'English',
    buttonText: 'Continue in english',
    localeData: enLocaleData,
    messages: enMessages
  }
];
