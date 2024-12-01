<script setup>
import {ref} from "vue";
import Loading from "@/components/common/Loading.vue";
import Button from "primevue/button";
import {useRestaurantHandling} from "@/composables/restaurantHandling.js";

const {restaurant} = defineProps({
  restaurant: Object
});
const containerRef = ref(null);

const {loadRestaurant, onRestaurantLoaded} = useRestaurantHandling();

</script>

<template>
  <div ref="containerRef">
    <Button @click="loadRestaurant(restaurant, containerRef)"
            label="Refresh" severity="secondary"
            class="absolute left-1/2 top-md -translate-x-1/2 transform"/>

    <template v-if="restaurant.handler">
      <div v-if="!restaurant.content" class="w-full h-full flex flex-row justify-center items-center font-bold">
        <Loading/>
      </div>
      <iframe v-else ref="frames" :srcdoc="restaurant.content" @load="onRestaurantLoaded(restaurant, containerRef)"
              class="w-full h-full border-none"
              :style="{ zoom: restaurant.zoom }"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals"></iframe>
    </template>
    <template v-else>
      <iframe :src="restaurant.url" ref="frames" class="w-full h-full border-none"
              @load="onRestaurantLoaded(restaurant, containerRef)"
              :style="{ zoom: restaurant.zoom }" referrerpolicy="unsafe-url"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals"></iframe>
    </template>
  </div>
</template>

<style scoped>

</style>