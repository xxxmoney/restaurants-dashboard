import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {NovodvorkaMenuService} from "../../../../src/common/services/menus/novodvorka.menu.service";

describe("getMenu", () => {
    it("should get menu Novodvorka", async () => {
        const menuService = new NovodvorkaMenuService(undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
