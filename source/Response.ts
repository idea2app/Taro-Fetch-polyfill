import Blob from 'miniprogram-blob';
import FormData from 'miniprogram-formdata';

import { Headers } from './Headers';
import { Body } from './Body';

export class Response extends Body implements globalThis.Response {
    type: ResponseType = 'basic';
    url: string;
    status: number;
    statusText: string;
    ok = false;
    redirected = false;
    headers: Headers;

    constructor(body?: BodyInit | null, init?: ResponseInit) {
        super();

        this.status = init?.status || 0;
        this.statusText = init?.statusText || '';

        if (init?.headers) this.headers = new Headers(init.headers);
        // @ts-ignore
        this.body =
            body instanceof ReadableStream
                ? body
                : body instanceof FormData ||
                    body instanceof globalThis.FormData
                  ? null
                  : body != null
                    ? new Blob([
                          body instanceof URLSearchParams ? body + '' : body
                      ]).stream()
                    : null;
    }

    clone() {
        return Object.assign(new Response(), this);
    }
}
