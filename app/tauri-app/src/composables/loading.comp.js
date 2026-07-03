import {computed, ref} from "vue";

export const useLoading = (timeout = 250) => {
  let timeoutId = undefined;
  const isLoading = ref(false);
  const isLoadingDebounced = ref(false);

  function startLoading() {
    isLoading.value = true;

    timeoutId = setTimeout(() => {
      isLoadingDebounced.value = true;
    }, timeout);
  }

  function stopLoading() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = undefined;

    isLoading.value = false;
    isLoadingDebounced.value = false;
  }

  return {
    isLoading: computed(() => isLoading.value),
    isLoadingDebounced: computed(() => isLoadingDebounced.value),

    startLoading,
    stopLoading,
  }
}
