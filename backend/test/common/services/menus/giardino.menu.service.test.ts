import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {GiardinoMenuService} from "../../../../src/common/services/menus/giardino.menu.service";

describe("getMenu", () => {
    it("should get menu Il Giardino", async () => {
        const menuService = new GiardinoMenuService(undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
