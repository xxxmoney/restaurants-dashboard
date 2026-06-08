<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import {Toast} from "primevue";
import AuthDialog from "@/components/dialogs/AuthDialog.vue";

</script>

<template>
  <Toast position="bottom-right"/>

  <main class="w-full h-full flex flex-col container mx-auto gap-md p-md">
    <NavBar class="flex-0"/>

    <div class="flex-1 w-full h-full">
      <RouterView/>
    </div>
  </main>

  <AuthDialog />
</template>

<style>

</style>
