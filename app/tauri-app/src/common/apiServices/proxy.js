import { api } from '@/axios';

export const ProxyService = {
    getHtml(url) {
        return api.get(`/proxy`, { params: { url: url } });
    }
}