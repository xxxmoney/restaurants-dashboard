import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useDialogsStore = defineStore('dialogs', () => {
  const dialogs = ref({
    auth: false
  });

  const auth = computed({
    get: () => dialogs.value.auth,
    set: (value) => dialogs.value.auth = value
  });

  return { auth }
})
