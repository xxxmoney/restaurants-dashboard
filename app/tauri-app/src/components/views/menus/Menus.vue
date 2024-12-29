<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button";
import Empty from "@/components/common/Empty.vue";
import Loading from "@/components/common/Loading.vue";
import {useMenuStore} from "@/stores/menu.store.js";
import {computed, onMounted, ref} from "vue";
import {formatDate} from "@/common/helpers/date.helper.js";
import {formatCurrency} from "@/common/helpers/currency.helper.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";

const {restaurantId} = defineProps({
  restaurantId: {
    type: Number,
    required: true
  }
});
const store = useMenuStore();

const restaurant = computed(() => RESTAURANTS[restaurantId]);
const menus = computed(() => store.getMenus(restaurantId));
const currentMenu = computed(() => store.getCurrentDayMenu(restaurantId));

const expandedRows = ref({});

async function loadMenus() {
  await store.loadMenus(restaurantId);

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
  <div class="flex flex-col gap-md px-sm py-md border-content border-2 rounded-lg">
    <div class="relative flex flex-row justify-center items-center min-h-10">
      <a :href="restaurant.url" target="_blank">{{ restaurant.name }}</a>

      <Button @click="loadMenus" icon="pi pi-refresh" class="absolute left-0"/>
    </div>

    <!-- There are no menus-->
    <div v-if="menus?.length === 0" class="w-full h-full flex flex-col">
      <Empty/>
    </div>
    <!-- Menus loading-->
    <div v-else-if="!menus" class="w-full h-full flex flex-col justify-center items-center">
      <Loading/>
    </div>
    <!-- Menus loaded and present-->
    <div v-else class="flex flex-col justify-center gap">
      <DataTable v-model:expandedRows="expandedRows" :value="menus" dataKey="date" :rowClass="getRowClass">
        <Column expander style="width: 2rem"/>

        <Column field="date" header="Date" sortable>
          <template #body="{ data }">
            <span class="text-lg font-bold">{{ formatDate(data.date) }}</span>
          </template>
        </Column>

        <template #expansion="{data}">
          <Empty v-if="data.items.length === 0"/>

          <DataTable v-else :value="data.items">
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
  </div>
</template>

