<script setup>
import {useRouter} from "vue-router";
import Card from 'primevue/card';
import Button from 'primevue/button';
import ImagePreview from "@/components/common/ImagePreview.vue";

const router = useRouter();

const goToWebsites = () => {
  router.push({name: 'websites'});
}
const goToMenus = () => {
  router.push({name: 'menus'});
}
</script>

<template>
  <div class="grid gap-md grid-cols-2 md:grid-cols-4">
    <Card class="hero-card" @click="goToWebsites">
      <template #header>
        <ImagePreview imageSrc="/images/restaurant.jpg"/>
      </template>
      <template #title>Webs</template>
      <template #content>
        <p class="m-0 h-full">
          Explore restaurants' website, just click below, don't be shy!
        </p>
      </template>
      <template #footer>
        <Button label="Go" class="w-full mt-md" @click="goToWebsites"/>
      </template>
    </Card>

    <Card class="hero-card" @click="goToMenus">
      <template #header>
        <ImagePreview imageSrc="/images/food.jpg"/>
      </template>
      <template #title>Menus</template>
      <template #content>
        <p class="m-0">
          See for yourself delicious menus of local restaurants, go ahead, try now!
        </p>
      </template>
      <template #footer>
        <Button label="Go" class="w-full mt-md" @click="goToMenus"/>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.hero-card {
  @apply hover:shadow-2xl hover:cursor-pointer;
}

:deep(.p-card-body) {
  flex: 1;
}

:deep(.p-card-content) {
  flex: 1;
}
</style>