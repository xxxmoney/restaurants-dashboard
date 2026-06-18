<script setup>
  import Button from 'primevue/button';
  import Popover from 'primevue/popover';
  import {useAuthStore} from "@/stores/auth.store.js";
  import {useDialogsStore} from "@/stores/dialog.store.js";
  import {useCustomToast} from "@/composables/customToast.comp.js";
  import {DEFAULT_USER_PROFILE_IMAGE} from "@/common/constants/common.constants.js";
  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import Loading from "@/components/common/Loading.vue";

  const popover = ref();
  const isLoading = ref(false);

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const dialogsStore = useDialogsStore();
  const {showInfoToast, showErrorToast} = useCustomToast();

  function togglePopover(event) {
    if (popover.value) {
      popover.value.toggle(event);
    }
  }

  function hidePopover() {
    if (popover.value) {
      popover.value.hide();
    }
  }

  function showAuthDialog() {
    dialogsStore.auth = true;
  }

  async function goToProfile() {
    await router.push({ name: 'profile' });
  }

  async function signOut() {
    try {
      isLoading.value = true;
      await authStore.signOut();
      showInfoToast('Signed out successfully');
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to sign out');
    } finally {
      isLoading.value = false;
      hidePopover();
      await router.push('/');
    }
  }
</script>

<template>
  <Button v-if="!authStore.isAuthenticated" @click="showAuthDialog" icon="pi-sign-in" label="Sign In" />
  <Button v-else variant="outlined" @click="togglePopover" :loading="isLoading">
    <img :src="authStore.user?.image ?? DEFAULT_USER_PROFILE_IMAGE" alt="User profile" class="w-8 h-8 rounded-full object-cover" />
  </Button>

  <Popover ref="popover">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else class="flex flex-col justify-between gap-md md:flex-row">
      <Button @click="goToProfile" icon="pi-user" label="Profile" />
      <Button @click="signOut" icon="pi-sign-out" label="Sign Out" />
    </div>
  </Popover>
</template>
