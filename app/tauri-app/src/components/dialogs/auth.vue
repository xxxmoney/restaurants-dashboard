<script setup>
  import {auth} from '@/auth'
  import {BACKEND_URL} from "root/shared/constants/common.constants.js";

  async function loginGoogle() {
    const data = await auth.signIn.social({
      provider: 'google',
      callbackUrl: BACKEND_URL,
    })
    console.log(data);
  }
</script>

<template>
  <Dialog>

  </Dialog>
</template>
