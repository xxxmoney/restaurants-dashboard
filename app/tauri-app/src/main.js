import {createApp} from "vue";
import {createPinia} from 'pinia'
import App from "./App.vue";
import PrimeVue from 'primevue/config';
import '@/assets/style.css';
import {router} from "@/router";
import ToastService from 'primevue/toastservice';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(ToastService);

app.use(PrimeVue, {
    theme: 'none'
});
app.use(router);

app.mount("#app");

