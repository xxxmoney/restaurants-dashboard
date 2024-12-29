<script setup>
import MultiSelect from 'primevue/multiselect';
import {useMenuStore} from "@/stores/menu.store.js";
import {storeToRefs} from "pinia";
import {MENUS} from "@/common/constants/menu.constants.js";
import Menus from "@/components/views/menus/Menus.vue";

const store = useMenuStore();
const {selectedIds} = storeToRefs(store);

</script>

<template>
  <div class="flex flex-col gap-lg h-full">
    <div class="flex flex-row gap-md">
      <MultiSelect v-model="selectedIds" :options="MENUS" optionLabel="name" optionValue="id"
                   placeholder="Select restaurant" filter showClear/>
    </div>

    <div class="grid gap-md grid-cols-1 md:grid-cols-4">
      <Menus v-for="id in selectedIds" :key="`menus-${id}`" :restaurantId="id"/>
    </div>
  </div>
</template>

