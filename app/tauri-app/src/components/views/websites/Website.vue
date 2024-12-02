<script setup>
import {ref, computed, watch, onMounted} from "vue";
import Loading from "@/components/common/Loading.vue";
import Button from "primevue/button";
import {useRestaurantHandling} from "@/composables/restaurantHandling.js";
import {useRestaurantsStore} from "@/stores/restaurants.js";
import {storeToRefs} from "pinia";

const {index} = defineProps({
  index: Number
});
const containerRef = ref(null)

const store = useRestaurantsStore();
const {restaurants} = storeToRefs(store);
const {loadRestaurant, onRestaurantLoaded, onRestaurantShow, addItemToScrollQueue} = useRestaurantHandling();

const restaurant = computed(() => restaurants.value[index]);
const isVisible = computed(() => store.isIndexVisible(index));

async function onShow() {
  const {scrollInQueue} = await onRestaurantShow(restaurant.value, containerRef.value);

  if (scrollInQueue) {
    addItemToScrollQueue(scrollInQueue, restaurant.value);
  }
}

async function load() {
  await loadRestaurant(restaurant.value, containerRef.value)

  if (isVisible.value) {
    await onShow();
  }
}

watch(isVisible, async (value) => {
  if (value) {
    await onShow();
  }
});

onMounted(async () => {
  await load();
});

</script>

<template>
  <div ref="containerRef" class="w-full h-full">
    <h1 class="text-lg text-center mb-md">{{ restaurant.name }}</h1>

    <Button @click="load"
            label="Refresh" severity="secondary"
            class="absolute left-1/2 top-5xl -translate-x-1/2 transform"/>

    <template v-if="restaurant.handler">
      <div v-if="!restaurant.content" class="w-full h-full flex flex-row justify-center items-center font-bold">
        <Loading/>
      </div>
      <iframe v-else ref="frames" :srcdoc="restaurant.content"
              @load="onRestaurantLoaded(restaurant, containerRef)"
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
