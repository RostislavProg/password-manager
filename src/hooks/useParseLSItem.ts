export function parseLocalStorageItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : null;
}