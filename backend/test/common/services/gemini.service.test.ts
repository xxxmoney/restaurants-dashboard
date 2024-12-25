import {
    env,
} from "cloudflare:test";
import {describe, it, expect} from "vitest";
import {GeminiService} from "../../../src/common/services/gemini.service";
import {Context} from "hono";

describe("prmpt", () => {
    it("should respond with not null", async () => {
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

        //expect(result).toStrictEqual([]);
        // Test result not empty
        expect(result).not.toBeNull();

    });
});