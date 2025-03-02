<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import {Toast} from "primevue";

</script>

<template>
  <Toast position="bottom-right"/>

  <main class="w-full h-full flex flex-col container mx-auto gap-md p-md">
    <NavBar class="flex-0"/>

    <div class="flex-1 w-full h-full">
      <RouterView/>
    </div>
  </main>
</template>

<style>

</style>
