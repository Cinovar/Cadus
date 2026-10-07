export function makeTypeGuard <T extends Record<string, string>> (obj : T) {
    return (value : string): value is T[keyof T] => {
        return Object.values(obj).includes(value);
    }
}