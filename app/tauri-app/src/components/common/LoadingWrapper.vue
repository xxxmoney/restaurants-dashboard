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
    <slot :class="{ 'invisible': isLoading }" />
    <div :class="{ 'invisible': !isLoading }" class="absolute z-10 inset-0 -translate-y-1/2 flex justify-center items-center">
      <Loading />
    </div>
  </div>
</template>

