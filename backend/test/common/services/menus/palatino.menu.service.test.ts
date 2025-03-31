import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {PalatinoMenuService} from "../../../../src/common/services/menus/palatino.menu.service";

describe("getMenu", () => {
    it("should get menu Bar Red Hook", async () => {
        const menuService = new PalatinoMenuService(undefined);
        const result = await menuService.getMenu();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
