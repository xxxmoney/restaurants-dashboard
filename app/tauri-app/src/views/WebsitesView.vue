<script setup>
import {ref, onMounted, computed, watch, onBeforeUnmount} from "vue";
import {useWebStore} from "@/stores/webs.js";
import {storeToRefs} from "pinia";
import Carousel from 'primevue/carousel';
import Select from 'primevue/select';
import Website from "@/components/views/websites/Website.vue";
import {useIsMobile} from "@/composables/isMobile.js";
import {scrollOntoItem} from "@/helpers/webUtilsHelper.js";
import {useRestaurantHandling} from "@/composables/restaurantHandling.js";

const store = useWebStore();
const {webs, visibleCount, visibleCounts} = storeToRefs(store);
const {getItemFromScrollQueue} = useRestaurantHandling();
const containersRef = ref([]);
const refreshKey = ref(0);
const {isMobile} = useIsMobile();
let interval = null;

const currentPage = computed({
  get: () => store.currentPage,
  set: (value) => store.currentPage = value
});

function resetCarousel() {
  currentPage.value = 0;

  refreshKey.value++;
}

const setVisibleCountFromViewMode = () => {
  if (isMobile.value) {
    store.setMobileVisibleCount();
  } else {
    store.setDesktopVisibleCount();
  }

  resetCarousel();
}

// Handle stuff when desktop/mobile view changes
watch(isMobile, () => {
  setVisibleCountFromViewMode();
});

onMounted(() => {
  setVisibleCountFromViewMode();

  // Process scrolling queue
  interval = setInterval(async () => {
    const item = getItemFromScrollQueue();
    if (item) {
      // Timeout
      await new Promise(resolve => setTimeout(resolve, 500));

      scrollOntoItem(item);
    }
  }, 250);
});

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});

</script>

<template>
  <div class="flex flex-col gap-lg h-full">
    <div class="flex flex-row justify-center">
      <Select v-model="visibleCount" :options="visibleCounts" @change="resetCarousel()"/>
    </div>

    <Carousel v-if="visibleCount" :key="refreshKey" :value="webs" v-model:page="currentPage"
              :numVisible="visibleCount"
              :numScroll="1" class="h-full">
      <template #item="{ index }">
        <Website ref="containersRef" class="relative" :index="index"/>
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