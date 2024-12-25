import {
    env,
} from "cloudflare:test";
import {describe, it, expect} from "vitest";

import {GeminiService} from "../../../src/common/services/gemini.service";
import {Context} from "hono";

describe("prmpt", () => {
    it("should respond with empty array", async () => {
        //
        // Arrange
        //


        //
        // Act
        //

        const result = await GeminiService.prompt({env} as Context, "test");

        
        //
        // Assert
        //

        expect(result).toStrictEqual([]);

    });
});