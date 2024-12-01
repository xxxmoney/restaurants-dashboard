<script setup>
import {ref, computed, onMounted} from "vue";
import {useRestaurantsStore} from "@/stores/restaurants.js";
import {storeToRefs} from "pinia";
import Carousel from 'primevue/carousel';
import Website from "@/components/views/websites/Website.vue";

const store = useRestaurantsStore();
const {restaurants, visibleCount} = storeToRefs(store);
const containersRef = ref([]);

const currentPage = computed({
  get: () => store.currentPage,
  set: (value) => store.currentPage = value
});

</script>

<template>
  <div class="h-full">
    <Carousel :value="restaurants" v-model:page="currentPage" :numVisible="visibleCount" :numScroll="1" class="h-full">
      <template #item="{ data }">
        <Website ref="containersRef" class="relative h-[95%]" :index="store.getRestaurantIndex(data)"/>
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