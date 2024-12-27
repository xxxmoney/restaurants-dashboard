<script setup>
import Button from 'primevue/button';
import Select from 'primevue/select';
import Loading from "@/components/common/Loading.vue"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useMenuStore} from "@/stores/menu.store.js";
import {storeToRefs} from "pinia";
import {MENUS} from "@/common/constants/menu.constants.js";
import {computed, onMounted, ref} from "vue";
import {formatDate, parseDate} from "@/common/helpers/date.helper.js";
import {formatCurrency} from "../common/helpers/currency.helper.js";

const store = useMenuStore();
const {restaurantId} = storeToRefs(store);

const {menus} = storeToRefs(store);
const currentMenu = computed(() => store.getCurrentDayMenu());

const expandedRows = ref({});

async function loadMenus() {
  await store.loadMenus();

  // Open current day menu if present
  if (currentMenu.value) {
    expandedRows.value = {};
    expandedRows.value[currentMenu.value.date] = true;
  }
}

function getRowClass(data) {
  return [{'!bg-green-400 !bg-opacity-40': data.date === currentMenu.value?.date}];
}

onMounted(async () => {
  await loadMenus();
});

</script>

<template>
  <div class="flex flex-col gap-lg h-full">
    <div class="flex flex-row gap-md">
      <Select v-model="restaurantId" :options="MENUS" optionLabel="name" optionValue="id"
              placeholder="Select restaurant" @change="loadMenus"/>

      <Button icon="pi pi-refresh" @click="loadMenus" :disabled="!restaurantId"/>
    </div>

    <div v-if="menus === null" class="w-full h-full flex flex-col justify-center items-center">
      <Loading/>
    </div>
    <div v-else-if="menus.length !== 0" class="flex flex-col justify-center gap">
      <DataTable v-model:expandedRows="expandedRows" :value="menus" dataKey="date" :rowClass="getRowClass">
        <Column expander style="width: 2rem"/>

        <Column field="date" header="Date" sortable>
          <template #body="{ data }">
            <span class="text-lg font-bold">{{ formatDate(data.date) }}</span>
          </template>
        </Column>

        <template #expansion="{data}">
          <DataTable :value="data.items">
            <Column field="name" header="Name" sortable></Column>
            <Column field="price" header="Price" sortable>
              <template #body="{data}">
                <span>{{ formatCurrency(data.price) }}</span>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>
    <div v-else class="w-full h-full flex flex-col">
      <!--      TODO: maybe some text that there are no menus?-->
    </div>

  </div>
</template>

