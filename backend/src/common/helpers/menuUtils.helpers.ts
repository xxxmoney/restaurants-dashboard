import {DateTime} from "luxon";

export function parseDate(text: string) {
    const regex = /(?<day>\d{1,2})(?: )?\.(?: )?(?<month>\d{1,2})(?: )?\.(?: )?(?<year>\d{4})/;
    const dateMatch = text.match(regex);

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
