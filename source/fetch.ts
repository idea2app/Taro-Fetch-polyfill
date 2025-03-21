import { request } from '@tarojs/taro';

import { Request, RequestInit } from './Request';
import { Response } from './Response';

export async function fetch(input: RequestInfo | URL, init?: RequestInit) {
    const req = new Request(input, init);

    const { method, url, headers, mode, credentials } = req;
    const header = {
        ...Object.fromEntries([...headers]),
        'Content-Type': ['HEAD', 'GET'].includes(method.toUpperCase())
            ? 'text/plain'
            : headers.get('Content-Type')
    };
    const response = await request<ArrayBuffer>({
        // @ts-ignore
        method,
        url,
        header,
        // @ts-ignore
        mode,
        credentials,
        data: await req.arrayBuffer(),
        responseType: 'arraybuffer'
    });

    return new Response(response.data, {
        status: response.statusCode,
        statusText: response.errMsg,
        headers: response.header
    });
}
