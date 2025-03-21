import * as URLSearchParams from '@ungap/url-search-params';
import FormData from 'miniprogram-formdata';
import { ReadableStream } from 'web-streams-polyfill';

import { Blob } from './Blob';
import { Headers } from './Headers';
import { Body } from './Body';

export { URLSearchParams };

export type BodyInit =
    | string
    | URLSearchParams
    | FormData
    | Blob
    | BufferSource
    | ReadableStream;

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

        this.body =
            body instanceof ReadableStream
                ? body
                : body instanceof FormData ||
                    body instanceof globalThis.FormData
                  ? null
                  : body != null
                    ? (new Blob([
                          body instanceof
                          (URLSearchParams as { new (): URLSearchParams })
                              ? body + ''
                              : body
                      ]).stream() as ReadableStream)
                    : null;
    }

    clone() {
        return Object.assign(new Response(), this);
    }
}
