<script setup>
import {ref, onMounted} from "vue";
import {useRestaurantsStore} from "@/stores/restaurants.js";
import {storeToRefs} from "pinia";
import Website from "@/components/views/websites/Website.vue";
import {useRestaurantHandling} from "@/composables/restaurantHandling.js";

const store = useRestaurantsStore();
const {restaurants} = storeToRefs(store);
const containersRef = ref([]);

const {loadRestaurants} = useRestaurantHandling();

onMounted(async () => {
  await loadRestaurants(containersRef.value);
});
</script>

<template>
  <div class="h-full grid grid-cols-4">
    <Website ref="containersRef" v-for="restaurant in restaurants" class="relative" :restaurant="restaurant"/>
  </div>
</template>

<style scoped>

</style>