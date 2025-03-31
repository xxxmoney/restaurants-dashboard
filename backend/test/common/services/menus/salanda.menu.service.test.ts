import {describe, expect, it} from "vitest";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../../constants";
import {SalandaMenuService} from "../../../../src/common/services/menus/salanda.menu.service";

describe("getMenu", () => {
    it("should get menu Bar Red Hook", async () => {
        const menuService = new SalandaMenuService(undefined);
        const result = await menuService.getMenu();

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
