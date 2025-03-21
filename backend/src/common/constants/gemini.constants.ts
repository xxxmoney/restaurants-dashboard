import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";

export const MODEL_NAME = 'gemini-2.0-flash';

export const DEFAULT_MIME_TYPE = 'image/jpeg';

export const PROMPT_TO_JSON = '{0}; Satisfy the previous prompt while returning ONLY the JSON that complies with the following YUP schema strictly, make sure to comply with formats for each field: {1}';

export const PROMPT_JSON_TO_JSON = '{0}; Satisfy the previous prompt while returning ONLY the JSON (valid JSON), that is a transformation of the following input JSON {1}, that complies with the following YUP schema strictly, make sure to comply with formats for each field: {2}';

export const MENU_PROMPTS = {
    [restaurantEnum.CINKY_LINKY]: `You are a restaurant menu digitizer. Convert the provided restaurant menu screenshot into a JSON representation, organized by day. The menus are per day, starting from monday {0} to friday {1} - date format '{2}'.`,
}

export const MENU_CATEGORIZATION_PROMPT = `You are a restaurant menu digitizer. Categorize the provided restaurant menu JSON representation into categorized JSON output. The categories should be typical, common categories for food (like 'Main dishes', 'Soups', 'Desserts', 'Salads', etc.) - maximum of 5 categories. Make sure that the first category is: 'Main dishes' while also translating the categories to the same language as input. Empty menus should be kept - but they should not have any categories.`;
