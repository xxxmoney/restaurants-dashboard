import {DateTime} from "luxon";
import * as yup from 'yup';
import {DATE_FORMAT} from "../../../../shared/constants/common.constants";

export const luxonDateTimeSchema = yup.mixed<DateTime>().transform(value => DateTime.fromFormat(value, DATE_FORMAT)).test(
    `luxon-datetime-format-${DATE_FORMAT}`,
    'Invalid Luxon DateTime',
    (value: any) => {
        return DateTime.isDateTime(value) && value.isValid;
    }
);
