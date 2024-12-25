import {GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai";
import {DEFAULT_MIME_TYPE, MODEL_NAME} from "../constants/gemini.constants";

export interface Image {
    base64: string,
    mimeType?: string,
}

export class GeminiService {
    private readonly model: GenerativeModel;

    constructor(apiKey: string) {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        this.model = generativeAI.getGenerativeModel({model: MODEL_NAME});
    }

    public async text(prompt: string): Promise<string> {
        const content = await this.model.generateContent([prompt]);
        return content.response.text().trim();
    }

    public async image(prompt: string, image: Image): Promise<string> {
        const imageData = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType ?? DEFAULT_MIME_TYPE,
            }
        }

        const content = await this.model.generateContent([prompt, imageData]);
        return content.response.text().trim();
    }
}
