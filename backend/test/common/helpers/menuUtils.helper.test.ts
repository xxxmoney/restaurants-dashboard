import {describe, expect, test} from "vitest";
import {DateTime} from "luxon";
import {parseDate} from "../../../src/common/helpers/menuUtils.helper";

describe("parseDate", () => {
    const cases: [string, DateTime][] = [
      ['Polední Menu 2.4. 2025', DateTime.fromObject({day: 2, month: 4, year: 2025})],
      ['2.4.2025', DateTime.fromObject({day: 2, month: 4, year: 2025})],
      ['2.4.', DateTime.fromObject({day: 2, month: 4, year: DateTime.now().year})],
    ];

    test.each(cases)("parseDate(%p) should return %p", (input, expected) => {
        const result = parseDate(input);

        expect(result).toEqual(expected);
    });
});
