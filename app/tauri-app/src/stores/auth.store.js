import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {auth} from "@/auth/index.js";
import {FRONTEND_URL} from "root/shared/constants/common.constants.js";

export const useAuthStore = defineStore('auth', () => {
  const userData = ref(null);

  const isAuthenticated = computed(() => !!userData.value);
  const isInitialized = ref(false);

  async function signInGoogle() {
    await auth.signIn.social({
      provider: 'google',
      callbackURL: FRONTEND_URL,
    });
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
    isInitialized.value = true;
    await verifyUser();
  }

  return {
    userData, // TODO: this works - use this for user profile, etc
    isAuthenticated,
    isInitialized,

    signInGoogle,
    initialize,
  }
})
