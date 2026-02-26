import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {MinigolfMenuService} from "../../../../src/common/services/menus/minigolf.menu.service";

describe("getMenu", () => {
    it("should get menu MiniGolf", async () => {
        const menuService = new MinigolfMenuService(undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
