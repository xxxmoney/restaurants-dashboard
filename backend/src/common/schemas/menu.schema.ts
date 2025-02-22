import * as yup from "yup";
import {luxonDateTimeSchema} from "./luxon.schema";

export const menuSchema = yup.object({
    date: luxonDateTimeSchema.required(),
    items: yup.array().of(yup.object({
        name: yup.string().required(),
        price: yup.number().required()
    })).required()
});

export const menusSchema = yup.object({
    menus: yup.array().of(menuSchema).required()
});

export const categorizedMenuSchema = yup.object({
    date: luxonDateTimeSchema.required(),
    categorizedItems: yup.array().of(yup.object({
        category: yup.string().required(),
        items: yup.array().of(yup.object({
            name: yup.string().required(),
            price: yup.number().required()
        })).required()
    })).required()
});

export const categorizedMenusSchema = yup.object({
    categorizedMenus: yup.array().of(categorizedMenuSchema).required()
});
