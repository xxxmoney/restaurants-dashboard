import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {WEBS} from "@/common/constants/webConstants.js";

export const useWebStore = defineStore('webs', () => {
    const webs = ref([...WEBS])
    const currentPage = ref(0);
    const visibleCount = ref(0);
    const visibleCounts = computed(() => [1, webs.value.length]);
    const scrollingQueue = ref([]);

    function setMobileVisibleCount() {
        visibleCount.value = 1;
    }

    function setDesktopVisibleCount() {
        visibleCount.value = webs.value.length;
    }

    function getWebIndex(web) {
        return webs.value.findIndex(r => r.name === web.name);
    }

    function isIndexVisible(index) {
        return index >= currentPage.value && index < currentPage.value + visibleCount.value;
    }

    return {
        webs,
        currentPage,
        visibleCount,
        visibleCounts,
        scrollingQueue,
        getWebIndex,
        isIndexVisible,
        setMobileVisibleCount,
        setDesktopVisibleCount,
    }
})