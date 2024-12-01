<script setup>
import {ref, computed, onMounted} from "vue";
import {useRestaurantsStore} from "@/stores/restaurants.js";
import {storeToRefs} from "pinia";
import Carousel from 'primevue/carousel';
import Website from "@/components/views/websites/Website.vue";
import {useRestaurantHandling} from "@/composables/restaurantHandling.js";
import {useIsMobile} from "@/composables/isMobile.js";

const store = useRestaurantsStore();
const {restaurants} = storeToRefs(store);
const containersRef = ref([]);

const {loadRestaurants} = useRestaurantHandling();
const {isMobile} = useIsMobile();

const numVisible = computed(() => isMobile.value ? 1 : 4);

onMounted(async () => {
  await loadRestaurants(containersRef.value);
});
</script>

<template>
  <div class="h-full">
    <Carousel :value="restaurants" :numVisible="numVisible" :numScroll="1" class="h-full">
      <template #item="{ data }">
        <Website ref="containersRef" class="relative h-[95%]" :restaurant="data"/>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
:deep(.p-carousel-content-container) {
  height: 100%;
}

:deep(.p-carousel-item) {
  height: 100%;
}

:deep(.p-carousel-item-list) {
  height: 100%;
}

:deep(.p-carousel-content) {
  flex: 1;
}

:deep(.p-carousel-viewport) {
  flex: 1;
}
</style>