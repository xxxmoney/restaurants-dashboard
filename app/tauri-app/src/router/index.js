import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth.store.js";
import {useDialogsStore} from "@/stores/dialog.store.js";
import HomeView from '@/views/HomeView.vue'
import WebsitesView from "@/views/WebsitesView.vue";
import MenusView from "@/views/MenusView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
    history: createWebHistory('/restaurants-dashboard/'),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/websites', name: 'websites', component: WebsitesView },
      { path: '/menus', name: 'menus', component: MenusView },
      { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const dialogsStore = useDialogsStore();

  if (!authStore.isInitialized) {
    try {
      await authStore.initialize();
    } catch (error) {
      console.error(error);
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    dialogsStore.auth = true;
    next('/');
  } else {
    next();
  }
});

export { router }
