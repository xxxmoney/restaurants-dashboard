import {describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {KamykMenuService} from "../../../../src/common/services/menus/kamyk.menu.service";

describe("getMenu", () => {
    it("should get menu Kamyk", async () => {
        const menuService = new KamykMenuService(env, undefined);
        const result = await menuService.getMenus();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
