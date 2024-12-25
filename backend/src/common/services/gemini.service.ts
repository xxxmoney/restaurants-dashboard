import {Context} from "hono";
import {useStorage} from "../composables/storage.comp";
import {GEMINI_API_KEY} from "../constants/storageValues.constants";

export const GeminiService = {

    async prompt(context: Context, prompt: string): Promise<any> {
        const storage = useStorage(context, GEMINI_API_KEY);

        // TODO: try prompting with gemini key
        return []
    }
}
