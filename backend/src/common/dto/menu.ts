import {DateTime} from "luxon";
import * as yup from 'yup';
import {luxonDateTimeSchema} from "./luxon";

export interface MenuItem {
    name: string;
    price: number;
}

export interface Menu {
    date: DateTime;
    items: MenuItem[];
}

export const menuSchema = yup.object({
    date: luxonDateTimeSchema.required(),
    items: yup.array().of(yup.object({
        name: yup.string().required(),
        price: yup.number().required()
    })).required()
});
