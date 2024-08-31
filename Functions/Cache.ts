// cache.js
const apiCache = new Map();

export function setCache(hash: string, data: any) {
    apiCache.set(hash, data);
}

export function getCache(hash: string) {
    return apiCache.get(hash);
}

export function hasCache(hash: string) {
    return apiCache.has(hash);
}

export function clearCache() {
    apiCache.clear();
}
