import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {VozovnaPankracMenuService} from "../../../../src/common/services/menus/vozovnaPankrac.menu.service";

describe("getMenu", () => {
    it("should get menu Bar Red Hook", async () => {
        const menuService = new VozovnaPankracMenuService(undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
