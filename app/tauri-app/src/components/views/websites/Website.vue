<script setup>
import {ref, computed, watch, onMounted} from "vue";
import Loading from "@/components/common/Loading.vue";
import Button from "primevue/button";
import {useWebHandling} from "@/composables/webHandling.js";
import {useWebStore} from "@/stores/webs.js";
import {storeToRefs} from "pinia";

const {index} = defineProps({
  index: Number
});
const containerRef = ref(null)

const store = useWebStore();
const {webs} = storeToRefs(store);
const {loadWeb, onWebLoaded, onWebShow, addItemToScrollQueue} = useWebHandling();

const web = computed(() => webs.value[index]);
const isVisible = computed(() => store.isIndexVisible(index));

async function onShow() {
  const {scrollInQueue} = await onWebShow(web.value, containerRef.value);

  if (scrollInQueue) {
    addItemToScrollQueue(scrollInQueue, web.value);
  }
}

async function load() {
  await loadWeb(web.value)

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
  <div ref="containerRef" class="w-full h-full flex flex-col">
    <h1 class="text-lg text-center mb-md flex-0">
      <a :href="web.url" target="_blank">{{ web.name }}</a>
    </h1>

    <Button @click="load"
            label="Refresh" severity="secondary"
            class="absolute left-1/2 top-5xl -translate-x-1/2 transform"/>

    <div class="flex-1">
      <div v-if="!web.content" class="w-full h-full flex flex-row justify-center items-center font-bold">
        <Loading/>
      </div>
      <iframe v-else ref="frames" :srcdoc="web.content" :class="{'hidden': !isVisible}"
              @load="onWebLoaded(web, containerRef)"
              class="w-full h-full border-none"
              :style="{ zoom: web.zoom }"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals"></iframe>
    </div>
  </div>
</template>
