import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {PalatinoMenuService} from "../../../../src/common/services/menus/palatino.menu.service";

describe("getMenu", () => {
    it("should get menu Palatino", async () => {
        const menuService = new PalatinoMenuService(undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
