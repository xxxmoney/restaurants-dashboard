import {PROXY_URL, REMOTE_PROXY_URL} from "../constants/common.constants.js";

export const ProxyService = {
    async getHtml(fetcher: Fetcher, url: string, charset: string | undefined): Promise<string | undefined> {
        const searchParamsObject: Record<string, string> = {
            url: url,
        };
        if (charset) {
            searchParamsObject.charset = charset;
        }
        const searchParams = new URLSearchParams(searchParamsObject);
        const response = await (fetcher ? fetcher.fetch(`${PROXY_URL}?${searchParams}`) : fetch(`${REMOTE_PROXY_URL}?${searchParams}`));

        return await response.text();
    }
}
