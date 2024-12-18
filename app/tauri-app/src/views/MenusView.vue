<script setup>
import Select from 'primevue/select';
import Loading from "@/components/common/Loading.vue"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useMenuStore} from "@/stores/menu.store.js";
import {storeToRefs} from "pinia";
import {MENUS} from "@/common/constants/menu.constants.js";
import {ref} from "vue";
import {formatDate} from "@/helpers/date.helper.js";
import {formatCurrency} from "../helpers/currency.helper.js";

const store = useMenuStore();
const {restaurantId} = storeToRefs(store);

const {menus} = storeToRefs(store);

const expandedRows = ref({});


</script>

<template>
  <div class="flex flex-col gap-lg h-full">
    <div class="flex flex-row gap">
      <Select v-model="restaurantId" :options="MENUS" optionLabel="name" optionValue="id"
              placeholder="Select restaurant" @change="store.loadMenus"/>

      <Button icon="pi pi-refresh" rounded raised/>
    </div>

    <div v-if="menus !== null" class="flex flex-col justify-center gap">
      <DataTable v-model:expandedRows="expandedRows" :value="menus" dataKey="date" tableStyle="min-width: 60rem">
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
    <div v-else class="flex flex-col justify-center">
      <Loading/>
    </div>

  </div>
</template>

