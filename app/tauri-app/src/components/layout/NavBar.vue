<script setup>

</script>

<template>
  <nav class="flex flex-col md:flex-row gap-4xl py-2xl">
    <h1 class="text-3xl max-md:text-center">Restaurants</h1>

    <ul class="flex flex-col md:flex-row items-center gap-md">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/overview">Overview</RouterLink>
      </li>
    </ul>
  </nav>

</template>
