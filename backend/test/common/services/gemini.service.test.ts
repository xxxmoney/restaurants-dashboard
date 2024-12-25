import {
    env,
} from "cloudflare:test";
import {describe, it, expect} from "vitest";
import {GeminiService} from "../../../src/common/services/gemini.service";
import {Context} from "hono";

describe("prmpt", () => {
    it("should respond with text YES", async () => {
        //
        // Arrange
        //

        // @ts-ignore
        const service = new GeminiService(env.GEMINI_KEY as string);


        //
        // Act
        //

        const result = await service.prompt("Test prompt, only respond with one word, 'YES'");
        const text = result.response.text();


        //
        // Assert
        //

        expect(text).not.toBeNull();
        console.log(text)
    });
});