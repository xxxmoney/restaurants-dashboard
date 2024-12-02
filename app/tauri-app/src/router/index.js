import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import WebsitesView from "@/views/WebsitesView.vue";
import MenusView from "@/views/MenusView.vue";

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/websites', name: 'websites', component: WebsitesView },
    { path: '/menus', name: 'menus', component: MenusView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export { router }