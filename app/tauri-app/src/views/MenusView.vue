<script setup>
import MultiSelect from 'primevue/multiselect';
import {useMenuStore} from "@/stores/menu.store.js";
import {storeToRefs} from "pinia";
import {MENUS} from "@/common/constants/menu.constants.js";
import Menus from "@/components/views/menus/Menus.vue";
import Button from "primevue/button";

const store = useMenuStore();
const {selectedIds} = storeToRefs(store);
</script>

<template>
  <div class="flex flex-col gap-xl h-full">
    <div class="flex flex-row gap-md">
      <Button @click="store.loadAllMenus()" icon="pi pi-refresh"/>

      <div class="max-w-full md:max-w-64 pr-4">
        <MultiSelect v-model="selectedIds" :options="MENUS" optionLabel="name" optionValue="id"
                     placeholder="Select restaurant" class="max-w-full" filter showClear/>
      </div>
    </div>

    <div class="grid flexible-grid gap-xl md:gap-md">
      <template v-for="id in selectedIds">
        <Menus :restaurantId="id"/>
      </template>
    </div>
  </div>
</template>

<style>
.flexible-grid {
  grid-template-columns: repeat(auto-fit, min(100%, 400px))
}
</style>

