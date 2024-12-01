import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from 'primevue/config';
import '@/assets/style.css';
import { router } from "@/router";

const app = createApp(App);

app.use(PrimeVue, {
    theme: 'none'
});
app.use(router);

app.mount("#app");

