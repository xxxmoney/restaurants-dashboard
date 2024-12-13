import { api } from '@/axios';

export const ProxyService = {
    getHtml(url, charset = null) {
        const params = {
            url
        }
        if (charset) {
            params.charset = charset;
        }
        
        return api.get(`/proxy`, { params: params });
    }
}