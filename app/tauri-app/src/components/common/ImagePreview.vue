<script setup>
const { maxHeight, imageSrc } = defineProps({
  maxHeight: {
    type: Number,
    default: 10
  },
  imageSrc: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="flex flex-col justify-center overflow-hidden" :style="`height: ${maxHeight}rem`">
    <img alt="image" :src="imageSrc" class="w-full" />
  </div>
</template>

<style scoped>

</style>