import {
    env,
} from "cloudflare:test";
import {describe, it, expect} from "vitest";

import {GeminiService} from "../src/common/services/gemini.service";

describe("prmpt", () => {
    it("should respond with empty array", async () => {
        //
        // Arrange
        //


        //
        // Act
        //

        // @ts-ignore
        const result = await GeminiService.prompt({env}, "test");

        //
        // Assert
        //
        expect(result).toStrictEqual([]);

    });
});