<script setup>
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import {useDialogsStore} from "@/stores/dialog.store.js";
  import {useAuthStore} from "@/stores/auth.store.js";
  import {useCustomToast} from "@/composables/customToast.comp.js";

  const dialogsStore = useDialogsStore();
  const authStore = useAuthStore();
  const {showErrorToast} = useCustomToast();

  async function loginGoogle() {
    try {
      await authStore.signInGoogle();
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to sign in with Google');
    }
  }
</script>

<template>
  <Dialog v-model:visible="dialogsStore.auth" modal header="Login" class="w-full max-w-xl">
    <div class="flex flex-col justify-center gap-md">
      <Button @click="loginGoogle">GOOGLE</Button>
    </div>
  </Dialog>
</template>
