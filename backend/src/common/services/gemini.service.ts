import {GenerateContentResult, GenerativeModel, GoogleGenerativeAI} from "@google/generative-ai";
import {DEFAULT_MIME_TYPE, MODEL_NAME} from "../constants/gemini.constants";

interface Image {
    base64: string;
    mimeType?: string;
}

class GeminiResponse {
    public readonly content: GenerateContentResult;

    constructor(content: GenerateContentResult) {
        this.content = content;
    }
}

export class TextReponse extends GeminiResponse {
    constructor(content: GenerateContentResult) {
        super(content);
    }

    public get text(): string {
        return this.content.response.text().trim();
    }
}

export class JsonResponse extends TextReponse {
    constructor(response: TextReponse) {
        super(response.content);
    }

    public get json(): any {
        return JSON.parse(this.text);
    }
}


export class GeminiService {
    private readonly model: GenerativeModel;

    constructor(apiKey: string) {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        this.model = generativeAI.getGenerativeModel({model: MODEL_NAME});
    }

    public async text(prompt: string): Promise<TextReponse> {
        const content = await this.model.generateContent([prompt]);
        return new TextReponse(content);
    }

    public async textJson(prompt: string): Promise<JsonResponse> {
        return new JsonResponse(await this.text(prompt));
    }

    public async image(prompt: string, image: Image): Promise<TextReponse> {
        const imageData = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType ?? DEFAULT_MIME_TYPE,
            }
        }

        const content = await this.model.generateContent([prompt, imageData]);
        return new TextReponse(content);
    }

    public async imageJson(prompt: string, image: Image): Promise<JsonResponse> {
        return new JsonResponse(await this.image(prompt, image));
    }

}
