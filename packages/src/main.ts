import './assets/style/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import { vLoading } from './directives';

createApp(App)
  .directive('loading', vLoading)
  .mount('#app');
