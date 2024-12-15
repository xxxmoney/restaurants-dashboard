import {useWebStore} from "@/stores/webs.js";
import {WebService} from "@/common/services/webService.js";

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

    async function loadWeb(web, container) {
        if (web.handler) {
            web.content = null;
            web.content = await WebService.getHandler(web.id)(web.url);
        } else {
            const frame = container.querySelector('iframe');

            // Refresh iframe
            frame.src = '';
            frame.src = web.url;
        }
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
        loadWeb,
        addItemToScrollQueue,
        getItemFromScrollQueue
    }
}
