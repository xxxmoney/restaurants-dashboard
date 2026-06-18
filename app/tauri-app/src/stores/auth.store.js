import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {auth} from "@/auth/index.js";
import {FRONTEND_URL} from "root/shared/constants/common.constants.js";

export const useAuthStore = defineStore('auth', () => {
  const isInitialized = ref(false);
  const userData = ref(null);

  const isAuthenticated = computed(() => !!userData.value);
  const user = computed(() => userData.value?.user);
  const session = computed(() => userData.value?.session);

  async function signInGoogle() {
    await auth.signIn.social({
      provider: 'google',
      callbackURL: FRONTEND_URL,
    });
  }

  async function signOut() {
    await auth.signOut();
    userData.value = null;
  }

  async function verifyUser() {
    const { data, error } = await auth.getSession();

    if (error) {
      throw new Error(`Error verifying user: ${error.message}`);
    }

    if (!data) {
      console.warn('No user present in session');
      return;
    }

    userData.value = data;
  }

  async function initialize() {
    // TODO: maybe hnadle session.expiresAt?
    isInitialized.value = true;
    await verifyUser();
  }

  return {
    user,
    session,
    isAuthenticated,
    isInitialized,

    initialize,
    signInGoogle,
    signOut
  }
})
