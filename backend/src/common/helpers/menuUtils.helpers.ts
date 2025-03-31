import {DateTime} from "luxon";

export function parseDate(text: string) {
    const date = text.match(/\d{1,2}\.\d{1,2}\.\d{4}/g)![0];
    return DateTime.fromFormat(date, 'd.M.yyyy');
}

export function parsePrice(text: string) {
    const match = text.match(/\d+/g);

    return match ? parseInt(match[0]) : -1;
}
