<script setup>
const {maxHeight, imageSrc} = defineProps({
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
  <div class="flex flex-col justify-center overflow-hidden rounded-xl md:rounded-xl" :style="`height: ${maxHeight}rem`">
    <img alt="image" :src="imageSrc" class="w-full h-full object-cover"/>
  </div>
</template>

<style scoped>

</style>