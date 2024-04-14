import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { ValidatePlugin } from 'vue-nice-validate';
import { createI18n } from 'vue-i18n';
import en from "./lang/en.json";
import ja from "./lang/ja.json";

const messages = {
  en: en,
  ja: ja
};
const i18n = createI18n({
	legacy: false,
	locale: 'ja', // set locale
	fallbackLocale: 'en', // set fallback locale
	messages,
});

const app = createApp(App);
	
const messageFormatter = (rule, params)=>{
	console.log(i18n.global.t('VALIDATION.EMAIL'), rule.toUpperCase(), params);
	return i18n.global.t('VALIDATION.'+rule.toUpperCase(), params)
};
app.use(ValidatePlugin,{messageFormatter});
app.use(i18n);
app.mount('#app');
