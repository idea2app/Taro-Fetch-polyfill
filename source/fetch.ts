import { request } from '@tarojs/taro';

import { Request } from './Request';
import { Response } from './Response';

export async function fetch(input: RequestInfo | URL, init?: RequestInit) {
    const req = new Request(input, init);

    const { method, url, headers, mode, credentials } = req;

    const { statusCode, errMsg, header, data } = await request<ArrayBuffer>({
        // @ts-ignore
        method,
        url,
        header: Object.fromEntries([...headers]),
        // @ts-ignore
        mode,
        credentials,
        data: await req.arrayBuffer(),
        responseType: 'arraybuffer'
    });

    return new Response(data, {
        status: statusCode,
        statusText: errMsg,
        headers: header
    });
}
