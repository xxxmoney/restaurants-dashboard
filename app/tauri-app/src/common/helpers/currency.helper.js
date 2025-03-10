import {CURRENCY} from "@/common/constants/common.constants.js";

export const formatCurrency = (value) => {
    return value.toLocaleString('cs-CZ', {
        style: 'currency',
        currency: CURRENCY
    });
};