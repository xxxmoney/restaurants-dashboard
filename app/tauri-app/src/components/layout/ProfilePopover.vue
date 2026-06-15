<script setup>
  import Button from 'primevue/button';
  import Popover from 'primevue/popover';
  import {useAuthStore} from "@/stores/auth.store.js";
  import {useDialogsStore} from "@/stores/dialog.store.js";
  import {useCustomToast} from "@/composables/customToast.comp.js";
  import {DEFAULT_USER_PROFILE_IMAGE} from "@/common/constants/common.constants.js";
  import {ref} from "vue";

  const popover = ref();

  const authStore = useAuthStore();
  const dialogsStore = useDialogsStore();
  const {showErrorToast} = useCustomToast();

  function togglePopover(event) {
    if (popover.value) {
      popover.value.toggle(event);
    }
  }

  function showAuthDialog() {
    dialogsStore.auth = true
  }

  function goToProfile() {
    // TODO: route to profile page, make new profile page
  }

  async function signOut() {
    try {
      await authStore.signOut();
      // TODO: maybe toast info message?
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to sign out');
    }
  }
</script>

<template>
  <Button variant="outlined" @click="togglePopover">
    <img :src="authStore.user?.image ?? DEFAULT_USER_PROFILE_IMAGE" alt="User profile" class="w-8 h-8 rounded-full object-cover" />
  </Button>

  <Popover ref="popover">
    <div class="flex flex-col justify-between gap-md md:flex-row">
      <Button v-if="!authStore.isAuthenticated" @click="showAuthDialog">Sign In</Button>
      <template v-else>
        <Button @click="goToProfile">Profile</Button>
        <Button @click="signOut">Sign Out</Button>
      </template>
    </div>
  </Popover>
</template>
