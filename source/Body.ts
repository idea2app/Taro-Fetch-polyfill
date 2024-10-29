import {
    ReadableStream,
    WritableStream,
    TransformStream
} from 'web-streams-polyfill';
import Blob from 'miniprogram-blob';
import FormData from 'miniprogram-formdata';

export { Blob, FormData, ReadableStream, WritableStream, TransformStream };

export class Body {
    body: ReadableStream<Uint8Array> | null = null;
    bodyUsed = false;

    async arrayBuffer() {
        const chunks: number[] = [],
            reader = this.body?.getReader();

        if (reader)
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                chunks.push(...value);
            }
        return new Uint8Array(chunks).buffer;
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
