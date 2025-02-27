import {GenerateContentResult, GenerativeModel, GoogleGenerativeAI, Part} from "@google/generative-ai";
import {PROMPT_TO_JSON, DEFAULT_MIME_TYPE, MODEL_NAME, PROMPT_JSON_TO_JSON} from "../constants/gemini.constants";
import format from "string-format";
import * as yup from 'yup';
import {AnyObject, ArraySchema, ObjectSchema} from "yup";
import {IS_DEBUG} from "../../../../shared/constants/common.constants";

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

    private getTextToJsonPrompt<T extends AnyObject>(prompt: string, schema: ObjectSchema<T>): string {
        const serializedSchema = JSON.stringify(schema.describe().fields);
        return format(PROMPT_TO_JSON, prompt, serializedSchema);
    }

    private getJsonToJsonPrompt<T extends AnyObject, K extends AnyObject>(prompt: string, schema: ObjectSchema<T>, input: K): string {
        const serializedInput = JSON.stringify(input);
        const serializedSchema = JSON.stringify(schema.describe().fields);
        return format(PROMPT_JSON_TO_JSON, prompt, serializedInput, serializedSchema);
    }

    private async generateContent(request: (string | Part)[]): Promise<GenerateContentResult> {
        if (IS_DEBUG) {
            console.info('Gemini request:', request);
        }
        const content = await this.model.generateContent(request);
        if (IS_DEBUG) {
            console.info('Gemini response:', content);
            console.info('Gemini response text:', content.response.text());
        }

        return content;
    }

    public async textToText(prompt: string): Promise<TextReponse> {
        const content = await this.generateContent([prompt]);
        return new TextReponse(content);
    }

    public async textToJson<T extends AnyObject>(prompt: string, schema: ObjectSchema<T>): Promise<JsonResponse<T>> {
        return new JsonResponse(await this.textToText(this.getTextToJsonPrompt(prompt, schema)), schema);
    }

    public async jsonToJson<K extends AnyObject, T extends AnyObject>(prompt: string, schema: ObjectSchema<T>, input: K): Promise<JsonResponse<T>> {
        return new JsonResponse(await this.textToText(this.getJsonToJsonPrompt(prompt, schema, input)), schema);
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
        return new JsonResponse(await this.imageToText(this.getTextToJsonPrompt(prompt, schema), image), schema);
    }

}
