import {DateTime} from "luxon";
import {DATE_FORMAT} from "root/shared/constants/common.constants.js";

export const formatDate = (date) => {
    return DateTime.fromFormat(date, DATE_FORMAT).toLocaleString(DateTime.DATE_MED)
}
