import {describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {CinkyLinkyMenuService} from "../../../../src/common/services/menus/cinkyLinky.menu.service";

describe("getMenu", () => {
    it("should get menu Cinky Linky", async () => {
        const menuService = new CinkyLinkyMenuService(env);
        const result = await menuService.getMenu();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
