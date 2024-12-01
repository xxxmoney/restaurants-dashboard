<script setup>

</script>

<template>
  <nav class="flex flex-col md:flex-row gap-4xl py-2xl">
    <RouterLink to="/" class="text-3xl max-md:text-center">Restaurants</RouterLink>

    <ul class="flex flex-col md:flex-row items-center gap-md">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/websites">Webs</RouterLink>
      </li>
      <li>
        <RouterLink to="/menus">Menus</RouterLink>
      </li>
    </ul>
  </nav>

</template>
