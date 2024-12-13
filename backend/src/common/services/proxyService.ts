import { PROXY_URL } from "../constants/commonConstants";

export const ProxyService = {
    async getHtml(url: string, charset: string | undefined): Promise<string | undefined> {
        const searchParamsObject: Record<string, string> = {
            url: url,
        };
        if (charset) {
            searchParamsObject.charset = charset;
        }
        const searchParams = new URLSearchParams(searchParamsObject);
        const response = await fetch(`${PROXY_URL}?${searchParams}`);

        return await response.text();
    }
}