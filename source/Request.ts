import { Headers } from './Headers';
import { Body } from './Body';

export class Request extends Body implements globalThis.Request {
    cache: RequestCache;
    credentials: RequestCredentials;
    destination: RequestDestination;
    headers: Headers;
    integrity: string;
    keepalive: boolean;
    method: string;
    mode: RequestMode;
    redirect: RequestRedirect;
    referrer: string;
    referrerPolicy: ReferrerPolicy;
    signal: AbortSignal;
    url: string;

    constructor(input: RequestInfo | URL, init?: RequestInit) {
        super();

        if (input instanceof Request) Object.assign(this, input);
        else this.url = input + '';

        if (!init) return;

        const { headers, body, ...fields } = init;

        if (headers) this.headers = new Headers(headers);
        if (body) this.body = new Response(body).body;

        Object.assign(this, fields);
    }

    clone() {
        return new Request(this);
    }
}
