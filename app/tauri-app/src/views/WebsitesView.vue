<script setup>
import {useRestaurantsStore} from "@/stores/restaurants.js";

const {restaurants} = useRestaurantsStore();
</script>

<template>
  <div v-for="restaurant in restaurants">
    {{ restaurant.name }}
  </div>
</template>

<style scoped>

</style>