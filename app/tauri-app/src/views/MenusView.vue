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

      <MultiSelect v-model="selectedIds" :options="MENUS" optionLabel="name" optionValue="id"
                   placeholder="Select restaurant" filter showClear/>
    </div>

    <div class="grid gap-xl grid-cols-1 md:gap-md md:grid-cols-4">
      <div v-for="id in selectedIds" :key="`menus-${id}`">
        <Menus :restaurantId="id"/>
      </div>
    </div>
  </div>
</template>

