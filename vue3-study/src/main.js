import { createApp } from 'vue'
import App from './App.vue'
import Tree from './components/tree';
import './assets/style.css';
import Icon from "./components/icon/icon";
const app = createApp(App);

app.component('icon', Icon);
Tree.install(app);

app.mount('#app');
