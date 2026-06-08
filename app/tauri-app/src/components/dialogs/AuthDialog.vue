<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import {BACKEND_URL} from "root/shared/constants/common.constants.js";
import {useDialogsStore} from "@/stores/dialog.store.js";
import {auth} from "@/auth/index.js";

  const dialogsStore = useDialogsStore();

  async function loginGoogle() {
    const data = await auth.signIn.social({
      provider: 'google',
      callbackUrl: BACKEND_URL,
    })
    console.log(data);
  }
</script>

<template>
  <Dialog v-model:visible="dialogsStore.auth" modal header="Login" class="w-full max-w-xl">
    <div class="flex flex-col justify-center gap-md">
      <Button @click="loginGoogle">GOOGLE</Button>
    </div>
  </Dialog>
</template>
