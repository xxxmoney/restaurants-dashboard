import {GenerateContentResult, GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai";
import {MODEL_NAME} from "../constants/gemini.constants";

export class GeminiService {
    private readonly model: GenerativeModel | undefined;

    constructor(apiKey: string) {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        this.model = generativeAI.getGenerativeModel({model: MODEL_NAME});
    }

    public async prompt(prompt: string): Promise<GenerateContentResult> {
        return await this.model!.generateContent([prompt]);
    }
}
