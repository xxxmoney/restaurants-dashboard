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
import {formatDate, parseDate} from "@/helpers/date.helper.js";
import {formatCurrency} from "../helpers/currency.helper.js";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";

const store = useMenuStore();
const {restaurantId} = storeToRefs(store);

const {menus} = storeToRefs(store);
const currentMenu = computed(() => store.getCurrentDayMenu());

const expandedRows = ref({});

async function loadMenus() {
  await store.loadMenus();

  // Open current day menu if present
  if (currentMenu.value) {
    expandedRows.value[parseDate(currentMenu.value.date).toFormat(DATE_FORMAT)] = true;
  }
}

onMounted(async () => {
  if (restaurantId.value) {
    await loadMenus();
  }
});

</script>

<template>
  <div class="flex flex-col gap-lg h-full">
    <div class="flex flex-row gap-md">
      <Select v-model="restaurantId" :options="MENUS" optionLabel="name" optionValue="id"
              placeholder="Select restaurant" @change="loadMenus"/>

      <Button icon="pi pi-refresh" @click="loadMenus" :disabled="!restaurantId"/>
    </div>

    <div v-if="menus !== null" class="flex flex-col justify-center gap">
      <DataTable v-model:expandedRows="expandedRows" :value="menus" dataKey="date">
        <Column expander style="width: 2rem"/>

        <Column field="date" header="Date">
          <template #body="{ data }">
            <span class="text-lg font-bold">{{ formatDate(data.date) }}</span>
          </template>
        </Column>

        <template #expansion="{data}">
          <DataTable :value="data.items">
            <Column field="name" header="Name"></Column>
            <Column field="price" header="Price">
              <template #body="{data}">
                <span>{{ formatCurrency(data.price) }}</span>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>
    <div v-else class="w-full h-full flex flex-col justify-center items-center">
      <Loading/>
    </div>

  </div>
</template>

