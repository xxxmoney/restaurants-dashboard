import {DateTime} from "luxon";
import {DATE_REGEX} from "../constants/menu.constants";

export function parseDate(text: string) {
    const dateMatch = text.match(DATE_REGEX);

    // Check if matched
    if (!dateMatch) {
        throw new Error('Date not matched');
    }

    // Get groups from match
    const day = parseInt(dateMatch.groups!.day);
    const month = parseInt(dateMatch.groups!.month);
    const year = parseInt(dateMatch.groups!.year);

    return DateTime.fromObject({day, month, year});
}

export function parsePrice(text: string) {
    const match = text.match(/\d+/g);

    return match ? parseInt(match[0]) : -1;
}
