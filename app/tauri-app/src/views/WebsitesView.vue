<script setup>
import {useRestaurantsStore} from "@/stores/restaurants.js";

const restaurantsStore = useRestaurantsStore();

const restaurants = restaurantsStore.restaurants;
</script>

<template>
  <div v-for="restaurant in restaurants">
    {{ restaurant.name }}
  </div>
</template>

<style scoped>

</style>