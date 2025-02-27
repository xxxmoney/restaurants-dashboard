import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";

export const MODEL_NAME = 'gemini-2.0-flash';

export const DEFAULT_MIME_TYPE = 'image/jpeg';

export const PROMPT_TO_JSON = '{0}; Satisfy the previous prompt while returning ONLY the JSON that complies with the following YUP schema strictly, make sure to comply with formats for each field: {1}';

export const PROMPT_JSON_TO_JSON = '{0}; Satisfy the previous prompt while returning ONLY the JSON (valid JSON), that is a transformation of the following input JSON {1}, that complies with the following YUP schema strictly, make sure to comply with formats for each field: {2}';

export const MENU_PROMPTS = {
    [restaurantEnum.CINKY_LINKY]: `You are a restaurant menu digitizer. Convert the provided restaurant menu screenshot into a JSON representation, organized by day, (make sure to provide valid date in specified JSON format).`,
}

export const MENU_CATEGORIZATION_PROMPT = `You are a restaurant menu digitizer. Categorize the provided restaurant menu JSON representation into categorized JSON output. The categories should be typical, common categories for food (like 'Soups', 'Main dishes', 'Salads', 'Desserts', etc.) - maximum of 5 categories. The categorizes should be in the same language as input.`;
