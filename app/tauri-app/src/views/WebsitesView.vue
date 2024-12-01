<script setup>
import {ref, onMounted} from "vue";
import Loading from "@/components/common/Loading.vue";
import {useRestaurantsStore} from "@/stores/restaurants.js";

const {restaurants, restaurantToIndex} = useRestaurantsStore();
const frames = ref([]);

async function onRestaurantLoaded(restaurant) {
  const frame = frames.value[restaurantToIndex.get(restaurant)];

  if (restaurant.onLoad) {
    await restaurant.onLoad(frame);
  }

  if (restaurant.onShow) {
    await restaurant.onShow(frame)
  }
}

async function loadRestaurant(restaurant) {
  const frame = frames.value[restaurantToIndex.get(restaurant)];

  if (restaurant.handler) {
    restaurant.content = null;
    restaurant.content = await restaurant.handler(restaurant.url);
  } else {
    // Refresh iframe
    frame.src = '';
    frame.src = restaurant.url;
  }
}

async function loadRestaurants() {
  for (const restaurant of restaurants) {
    await loadRestaurant(restaurant);
  }
}

onMounted(async () => {
  await loadRestaurants();
});
</script>

<template>
  <div class="h-full grid grid-cols-4">
    <div v-for="restaurant in restaurants">
      <template v-if="restaurant.handler">
        <div v-if="!restaurant.content" class="w-full h-full flex flex-row justify-center items-center font-bold">
          <Loading/>
        </div>
        <iframe v-else ref="frames" :srcdoc="restaurant.content" @load="onRestaurantLoaded(restaurant)"
                class="w-full h-full border-none"
                :style="{ zoom: restaurant.zoom }"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals"></iframe>
      </template>
      <template v-else>
        <iframe :src="restaurant.url" ref="frames" class="w-full h-full border-none"
                @load="onRestaurantLoaded(restaurant)"
                :style="{ zoom: restaurant.zoom }" referrerpolicy="unsafe-url"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals"></iframe>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>