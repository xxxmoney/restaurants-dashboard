<script setup>
  import {useAuthStore} from "@/stores/auth.store.js";
  import {DEFAULT_USER_PROFILE_IMAGE} from "@/common/constants/common.constants.js";

  const {user} = useAuthStore();
</script>

<template>
  <div class="flex flex-col items-center">
    <article class="flex flex-col gap-md w-full max-w-xs">
      <img :src="user.image ?? DEFAULT_USER_PROFILE_IMAGE" class="w-32 h-32 object-cover rounded-full mx-auto mb-xl" />
      <h2 class="text-xl text-center">{{user.name}}</h2>
      <p class="text-center">{{user.email}}</p>
    </article>
  </div>
</template>
