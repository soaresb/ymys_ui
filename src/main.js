import { createApp } from 'vue'
import App from './App.vue'
import ymysApi from "@/api/api";
import router from './router'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(ymysApi, {baseURL: `http://localhost:80`});
app.mount('#app');
