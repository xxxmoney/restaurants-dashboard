<script setup>
import ProfilePopover from "@/components/layout/ProfilePopover.vue";
</script>

<template>
  <nav class="flex flex-col md:flex-row gap-4xl py-2xl">
    <RouterLink to="/" class="text-3xl max-md:text-center">Restaurants</RouterLink>

    <ul class="flex-1 flex flex-row items-center gap-md max-md:mx-auto">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/websites">Webs</RouterLink>
      </li>
      <li>
        <RouterLink to="/menus">Menus</RouterLink>
      </li>
      <li class="flex-1"></li>
      <li class="order-first md:order-none">
        <ProfilePopover />
      </li>
    </ul>
  </nav>

</template>
