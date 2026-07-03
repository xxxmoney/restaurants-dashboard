<script setup>
  import Loading from "@/components/common/Loading.vue";

  const { isLoading } = defineProps({
    isLoading: {
      type: Boolean,
      required: true
    }
  });
</script>

<template>
  <div class="relative">
    <div :class="{ 'invisible': isLoading }">
      <slot />
    </div>
    <div :class="{ 'invisible': !isLoading }" class="absolute z-10 inset-0">
      <Loading />
    </div>
  </div>
</template>

