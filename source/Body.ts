import {
    ReadableStream,
    WritableStream,
    TransformStream
} from 'web-streams-polyfill';
import FormData from 'miniprogram-formdata';

import { Blob } from './Blob';

export { FormData, ReadableStream, TransformStream, WritableStream };

export class Body implements globalThis.Body {
    body: ReadableStream<Uint8Array> | null = null;
    bodyUsed = false;

    async bytes() {
        const chunks: number[] = [],
            reader = this.body?.getReader();

        if (reader)
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                chunks.push(...value);
            }
        return new Uint8Array(chunks);
    }

    async arrayBuffer() {
        return (await this.bytes()).buffer;
    }

    async blob() {
        return new Blob([await this.arrayBuffer()]);
    }

    async text() {
        const data = await this.blob();

        return data.text();
    }

    async json() {
        const text = await this.text();

        return JSON.parse(text);
    }

    /**
     * @deprecated 尚未实现内部逻辑
     */
    async formData() {
        return new FormData() as globalThis.FormData;
    }
}
