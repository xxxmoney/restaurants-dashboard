<script setup>
  import {useAuthStore} from "@/stores/auth.store.js";
  import {useDialogsStore} from "@/stores/dialog.store.js";

  const authStore = useAuthStore();
  const dialogsStore = useDialogsStore();

  function showAuthDialog() {
    dialogsStore.auth = true
  }
  async function signOut() {
    await authStore.signOut();
  }
</script>

<template>
  <nav class="flex flex-col md:flex-row gap-4xl py-2xl">
    <RouterLink to="/" class="text-3xl max-md:text-center">Restaurants</RouterLink>

    <ul class="flex flex-row items-center gap-md max-md:mx-auto">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/websites">Webs</RouterLink>
      </li>
      <li>
        <RouterLink to="/menus">Menus</RouterLink>
      </li>
      <li>
        <Button v-if="!authStore.isAuthenticated" @click="showAuthDialog">Sign In</Button>
        <Button v-else @click="signOut">Sign Out</Button>
      </li>
    </ul>
  </nav>

</template>
