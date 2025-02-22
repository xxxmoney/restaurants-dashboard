import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";

export const MODEL_NAME = 'gemini-2.0-flash-lite-preview-02-05';

export const DEFAULT_MIME_TYPE = 'image/jpeg';

export const COMPLY_WITH_SCHEMA_PROMPT = '{0}; Satisfy the previous prompt while returning only JSON that complies with the following YUP schema strictly, make sure to comply with formats for each field: {1}';

export const MENU_PROMPTS = {
    [restaurantEnum.CINKY_LINKY]: `You are a restaurant menu digitizer. Convert the provided restaurant menu screenshot into a JSON representation, organized by day.`,
}
