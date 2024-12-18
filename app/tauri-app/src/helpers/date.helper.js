import {DateTime} from "luxon";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";

export const parseDate = (stringValue) => {
    return DateTime.fromFormat(stringValue, DATE_FORMAT);
}

export const formatDate = (stringValue) => {
    return parseDate(stringValue).toLocaleString(DateTime.DATE_MED)
}
