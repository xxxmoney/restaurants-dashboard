import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WebsitesView from "@/views/WebsitesView.vue";
import MenusView from "@/views/MenusView.vue";
import {useAuthStore} from "@/stores/auth.store.js";

const router = createRouter({
    history: createWebHistory('/restaurants-dashboard/'),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/websites', name: 'websites', component: WebsitesView },
      { path: '/menus', name: 'menus', component: MenusView },
    ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isInitialized) {
    await authStore.initialize();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export { router }
