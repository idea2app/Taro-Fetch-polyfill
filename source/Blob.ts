import MPBlob from 'miniprogram-blob';
import { ReadableStream } from 'web-streams-polyfill';

export class Blob extends MPBlob implements globalThis.Blob {
    async bytes() {
        const buffer = await this.arrayBuffer();

        return new Uint8Array(buffer);
    }

    slice(start?: number, end?: number, contentType?: string): Blob {
        const blob = super.slice(start, end, contentType);

        return Object.setPrototypeOf(blob, Blob.prototype);
    }

    stream() {
        return new ReadableStream({
            start: async controller => {
                const bytes = await this.bytes();

                for (let offset = 0; offset < bytes.length; offset += 1024) {
                    const chunk = bytes.slice(offset, offset + 1024);

                    controller.enqueue(chunk);
                }
                controller.close();
            }
        });
    }
}
