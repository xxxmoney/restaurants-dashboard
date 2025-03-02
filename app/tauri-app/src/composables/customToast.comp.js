import {useToast} from "primevue";
import {LIFE_TIME} from "@/common/constants/toast.constants.js";

export const useCustomToast = () => {
    const toast = useToast();

    function showSuccessToast(message, summary = 'Success') {
        toast.add({severity: 'success', summary: summary, detail: message, life: LIFE_TIME});
    }

    function showErrorToast(message, summary = 'Error') {
        toast.add({severity: 'error', summary: summary, detail: message, life: LIFE_TIME});
    }

    function showInfoToast(message, summary = 'Info') {
        toast.add({severity: 'info', summary: summary, detail: message, life: LIFE_TIME});
    }

    return {
        showSuccessToast,
        showErrorToast,
        showInfoToast
    }
}
