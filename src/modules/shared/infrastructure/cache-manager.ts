interface CacheEntry<T> {
    value: T;
    expiry: number;
}

export class CacheManager {
    private readonly DEFAULT_TTL_SECONDS = 3600;

    set<T>(key: string, value: T, ttl: number = this.DEFAULT_TTL_SECONDS): void {
        if (typeof window === 'undefined') return;

        const entry: CacheEntry<T> = {
            value,
            expiry: Date.now() + ttl * 1000,
        };
        try {
            localStorage.setItem(key, JSON.stringify(entry));
        } catch (e) {
            console.warn('LocalStorage error', e);
        }
    }

    get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null;

        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const entry: CacheEntry<T> = JSON.parse(item);

            if (Date.now() > entry.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            return entry.value;
        } catch (e) {
            console.warn('LocalStorage error', e);
            return null;
        }
    }

    remove(key: string): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    }
}
