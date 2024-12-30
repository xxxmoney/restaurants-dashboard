import {describe, expect, it} from "vitest";
import {GeminiService} from "../../../src/common/services/gemini.service";
import {env} from "cloudflare:test";


describe("textToText", () => {
    it("should respond with text 'YES'", async () => {
        //
        // Arrange
        //

        // @ts-ignore
        const service = new GeminiService(env.GEMINI_KEY);


        //
        // Act
        //

        const result = await service.textToText("Test prompt, only respond with one word: 'YES'");


        //
        // Assert
        //

        expect(result.text).toBe("YES");
        console.log(result.text)
    });
});
