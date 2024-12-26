import {GenerateContentResult, GenerativeModel, GoogleGenerativeAI, Part} from "@google/generative-ai";
import {COMPLY_WITH_SCHEMA_PROMPT, DEFAULT_MIME_TYPE, MODEL_NAME} from "../constants/gemini.constants";
import format from "string-format";
import * as yup from 'yup';
import {AnyObject, ObjectSchema} from "yup";

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

export class JsonResponse<T extends AnyObject> extends TextReponse {
    private readonly schema: ObjectSchema<T>;

    constructor(response: TextReponse, schema: ObjectSchema<T>) {
        super(response.content);
        this.schema = schema;
    }

    public get json(): T {
        const formattedText = this.text.replace('```json', '').replace('```', '');
        return this.schema.cast(JSON.parse(formattedText)) as T;
    }
}

export class GeminiService {
    private readonly model: GenerativeModel;

    constructor(apiKey: string) {
        const generativeAI = new GoogleGenerativeAI(apiKey);
        this.model = generativeAI.getGenerativeModel({model: MODEL_NAME});
    }

    private getJsonPrompt<T extends AnyObject>(prompt: string, schema: ObjectSchema<T>): string {
        const serializedSchema = JSON.stringify(schema.describe().fields);
        return format(COMPLY_WITH_SCHEMA_PROMPT, prompt, serializedSchema);
    }

    private async generateContent(request: (string | Part)[]): Promise<GenerateContentResult> {
        console.log('Gemini request:', request);
        const content = await this.model.generateContent(request);
        console.log('Gemini response:', content);
        console.log('Gemini response text:', content.response.text());

        return content;
    }

    public async textToText(prompt: string): Promise<TextReponse> {
        const content = await this.generateContent([prompt]);
        return new TextReponse(content);
    }

    public async textToJson<T extends AnyObject>(prompt: string, schema: ObjectSchema<T>): Promise<JsonResponse<T>> {
        return new JsonResponse(await this.textToText(this.getJsonPrompt(prompt, schema)), schema);
    }

    public async imageToText(prompt: string, image: Image): Promise<TextReponse> {
        const imageData = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType ?? DEFAULT_MIME_TYPE,
            }
        }

        const content = await this.generateContent([prompt, imageData]);
        return new TextReponse(content);
    }

    public async imageToJson<T extends AnyObject>(prompt: string, schema: ObjectSchema<T>, image: Image): Promise<JsonResponse<T>> {
        return new JsonResponse(await this.imageToText(this.getJsonPrompt(prompt, schema), image), schema);
    }

}
