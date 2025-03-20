<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button";
import {Divider} from "primevue";
import Empty from "@/components/common/Empty.vue";
import Loading from "@/components/common/Loading.vue";
import {useMenuStore} from "@/stores/menu.store.js";
import {computed, onMounted, ref} from "vue";
import {formatDate} from "@/common/helpers/date.helper.js";
import {formatCurrency} from "@/common/helpers/currency.helper.js";
import {RESTAURANTS} from "root/shared/constants/restaurant.constants.js";
import {useCustomToast} from "@/composables/customToast.comp.js";
import Dead from "@/components/common/Dead.vue";
import {CURRENCY, CURRENCY_SYMBOL} from "@/common/constants/common.constants.js";

const {restaurantId} = defineProps({
  restaurantId: {
    type: Number,
    required: true
  }
});
const store = useMenuStore();
const {showErrorToast} = useCustomToast();

const restaurant = computed(() => RESTAURANTS[restaurantId]);
const menus = computed(() => store.getMenus(restaurantId));
const currentMenu = computed(() => store.getCurrentDayMenu(restaurantId));

const expandedRows = ref({});

async function loadMenus() {
  try {
    await store.loadMenus(restaurantId);
  } catch (e) {
    showErrorToast(`Failed to load menus for '${RESTAURANTS[restaurantId].name}'`);
  }

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
  <div class="flex flex-col gap-md px-sm py-lg border-content border-e-0 border-l-0 border-2 rounded-lg">
    <div
        class="sticky top-0 z-10 py-xl mx-xs rounded-xl background-primary-contrast-brighter flex flex-row justify-center items-center min-h-10">
      <a class="" :href="restaurant.url" target="_blank">{{ restaurant.name }}</a>

      <Button @click="loadMenus" icon="pi pi-refresh" class="absolute left-md z-10"/>
    </div>

    <!-- There was an error-->
    <div v-if="menus === undefined" class="w-full h-full flex flex-col">
      <Dead/>
    </div>
    <!-- There are no menus-->
    <div v-else-if="menus?.length === 0" class="w-full h-full flex flex-col">
      <Empty/>
    </div>
    <!-- Menus loading-->
    <div v-else-if="menus === null" class="w-full h-full flex flex-col justify-center items-center">
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
          <Empty v-if="data.categorizedItems.length === 0"/>

          <template v-else>
            <div class="flex flex-col" v-for="categorizedItem in data.categorizedItems">
              <span class="p-lg text-lg font-bold">{{ categorizedItem.category }}</span>
              <Divider class="mt-0"/>

              <DataTable :value="categorizedItem.items" sortField="price" :sortOrder="1">
                <Column field="name" header="Name"/>
                <Column field="price" header="Price" headerClass="w-1/3" sortable>
                  <template #body="{data}">
                    <span v-if="data.price === -1">? {{ CURRENCY_SYMBOL }}</span>
                    <span v-else>{{ formatCurrency(data.price) }}</span>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </template>
      </DataTable>
    </div>
  </div>
</template>

