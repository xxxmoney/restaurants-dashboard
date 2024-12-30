import {restaurantEnum} from "../../../../shared/enums/restaurant.enum";

export const MODEL_NAME = 'gemini-2.0-flash-exp';

export const DEFAULT_MIME_TYPE = 'image/jpeg';

export const COMPLY_WITH_SCHEMA_PROMPT = '{0}; Satisfy the previous prompt while returning only JSON that complies with the following YUP schema strictly: {1}';

export const MENU_PROMPTS = {
    [restaurantEnum.U_SISKU]: 'Using the provided screenshot of menu from the restaurant U Sisku, return the menus for each day, if there are none, return empty, stick strictly to what is only visible in the screenshot - if there are no typical menus visible, return empty',
}
