import {describe, expect, it} from "vitest";
import {env} from "cloudflare:test";
import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";
import {MenuProcessor} from "../../../src/common/services/menuProcessor.service";
import {LONG_RUNNING_TEST_TIMEOUT} from "../../constants";

describe("getMenu", () => {
    it("should get menu cinky linky (long running)", async () => {
        const restaurantId = restaurantEnum.CINKY_LINKY;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu klika", async () => {
        const restaurantId = restaurantEnum.KLIKA;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu red hook", async () => {
        const restaurantId = restaurantEnum.BAR_RED_HOOK;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu palatino", async () => {
        const restaurantId = restaurantEnum.PALATINO;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu salanda", async () => {
        const restaurantId = restaurantEnum.SALANDA;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu vozovna pankrac", async () => {
        const restaurantId = restaurantEnum.VOZOVNA_PANKRAC;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu Novodvorka", async () => {
        const restaurantId = restaurantEnum.NOVODVORKA;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu Mini Golf", async () => {
        const restaurantId = restaurantEnum.MINI_GOLF;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu Il Giardino", async () => {
        const restaurantId = restaurantEnum.IL_GIARDINO;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});

    it("should get menu Kamyk", async () => {
        const restaurantId = restaurantEnum.KAMYK;

        const result = await MenuProcessor.getProcessedMenusWithCache(env, restaurantId);

        expect(result).not.null;
        console.log(JSON.stringify(result, null, 2));
    }, {timeout: LONG_RUNNING_TEST_TIMEOUT});
});
