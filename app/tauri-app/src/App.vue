<script setup>
import NavBar from '@/components/layout/NavBar.vue'

</script>

<template>
  <main class="w-full h-full flex flex-col container mx-auto gap-md px-4">
    <NavBar class="flex-0" />

    <div class="flex-1">
      <RouterView />
    </div>
  </main>
</template>

<style>

</style>
