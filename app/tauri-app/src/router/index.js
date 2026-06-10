import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import WebsitesView from "@/views/WebsitesView.vue";
import MenusView from "@/views/MenusView.vue";

const router = createRouter({
    history: createWebHistory('/restaurants-dashboard/'),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/websites', name: 'websites', component: WebsitesView },
      { path: '/menus', name: 'menus', component: MenusView },
    ]
});

// TODO: maybe use authentication verification here with beforeEach?
// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//
//   // 🚨 Crucial: Wait for Better Auth to check the session BEFORE doing anything else
//   await authStore.initializeAuth();
//
//   // Now the store is 100% guaranteed to be populated
//   if (to.meta.requiresAuth && !authStore.user) {
//     // If route requires auth and user isn't logged in, send to login
//     next('/login');
//   } else if (to.path === '/login' && authStore.user) {
//     // If logged in user tries to go to login page, send to dashboard
//     next('/dashboard');
//   } else {
//     // Otherwise, carry on!
//     next();
//   }
// });

export { router }
