import {DateTime} from "luxon";
import {DATE_REGEX} from "../constants/menu.constants";

export function parseDate(text: string): DateTime {
    const dateMatch = text.match(DATE_REGEX);

    // Check if matched
    if (!dateMatch) {
        throw new Error(`Date not matched from text: '${text}'`);
    }

    // Get groups from match
    const day = parseInt(dateMatch.groups!.day);
    const month = parseInt(dateMatch.groups!.month);
    const year = dateMatch.groups!.year ? parseInt(dateMatch.groups!.year) : DateTime.now().year;

    return DateTime.fromObject({day: day, month: month, year: year});
}

export function parsePrice(text: string): number {
    const match = text.match(/\d+/g);

    return match ? parseInt(match[0]) : -1;
}
