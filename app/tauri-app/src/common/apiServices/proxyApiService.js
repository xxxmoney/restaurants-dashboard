import {api} from '@/axios';

export const ProxyApiService = {
    getHtml(url, charset = null) {
        const params = {
            url: url
        }
        if (charset) {
            params.charset = charset;
        }

        return api.get(`/proxy`, {params: params});
    }
}