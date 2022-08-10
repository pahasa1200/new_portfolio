import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';
import i18n from './locale';

createApp(App)
  .use(i18n)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
