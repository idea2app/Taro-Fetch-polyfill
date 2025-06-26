type HeaderMap = Record<string, string[]>;

const store = new WeakMap<Headers, HeaderMap>();

export class Headers implements globalThis.Headers {
    constructor(init?: HeadersInit) {
        if (!init) return;

        init =
            init instanceof Headers
                ? [...init]
                : init instanceof Array
                  ? init
                  : Object.entries(init);

        for (const [key, value] of init) this.append(key, value);
    }

    append(name: string, value: string) {
        const map = store.get(this) || {};

        (map[name.toLowerCase()] ||= []).push(value);

        store.set(this, map);
    }

    set(name: string, value: string) {
        const map = store.get(this) || {};

        map[name.toLowerCase()] = [value];

        store.set(this, map);
    }

    get(name: string) {
        return store.get(this)?.[name.toLowerCase()]?.join() ?? null;
    }

    has(name: string) {
        return this.get(name.toLowerCase()) != null;
    }

    delete(name: string) {
        const map = store.get(this) || {};

        delete map[name.toLowerCase()];
    }

    *[Symbol.iterator]() {
        for (const [key, value] of Object.entries(store.get(this) || {})) {
            const name = key.replace(/^\w|-\w/g, firstLetter =>
                firstLetter.toUpperCase()
            );
            yield [name, value?.join()] as [string, string];
        }
    }

    entries() {
        return this[Symbol.iterator]();
    }

    *keys() {
        yield* Object.keys(store.get(this) || {});
    }

    *values() {
        for (const value of Object.values(store.get(this) || {}))
            yield value?.join();
    }

    forEach(
        callbackfn: (
            value: string,
            key: string,
            parent: globalThis.Headers
        ) => void,
        thisArg?: any
    ) {
        for (const [key, value] of this)
            callbackfn.call(thisArg, value, key, this);
    }

    getSetCookie(): string[] {
        return store.get(this)?.['set-cookie'] ?? [];
    }
}
