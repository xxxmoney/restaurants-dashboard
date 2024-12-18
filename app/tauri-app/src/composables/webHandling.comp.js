import {useWebStore} from "@/stores/web.store.js";
import {WebService} from "@/common/services/web.service.js";

export const useWebHandling = () => {
    const store = useWebStore();

    async function onWebLoaded(web, container) {
        const frame = container.querySelector('iframe');

        await WebService.getOnLoad(web.id)(frame);
    }

    async function onWebShow(web, container) {
        const frame = container.querySelector('iframe');

        return await WebService.getOnShow(web.id)(frame);
    }

    function addItemToScrollQueue(item, web) {
        const value = {
            item,
            index: store.getWebIndex(web)
        };

        store.scrollingQueue.push(value);
    }

    function getItemFromScrollQueue() {
        // No item to scroll
        if (store.scrollingQueue.length === 0) {
            return null;
        }

        const {item, index} = store.scrollingQueue.shift();
        // Not current page, should no be scrolled onto
        if (store.isIndexVisible(index)) {
            return item;
        }

        return null;
    }

    return {
        onWebLoaded,
        onWebShow,
        addItemToScrollQueue,
        getItemFromScrollQueue
    }
}
