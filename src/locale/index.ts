import { createI18n } from 'vue-i18n';
import en from './en.json';

const i18n = createI18n({
  legacy: false,
  messages: {
    en,
  },
});

export default i18n;
