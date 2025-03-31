import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {KlikaMenuService} from "../../../../src/common/services/menus/klika.menu.service";

describe("getMenu", () => {
    it("should get menu Klika", async () => {
        const menuService = new KlikaMenuService(undefined);
        const result = await menuService.getMenu();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
