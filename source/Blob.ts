import MPBlob from 'miniprogram-blob';

export class Blob extends MPBlob implements globalThis.Blob {
    async bytes() {
        const buffer = await this.arrayBuffer();

        return new Uint8Array(buffer);
    }

    slice(start?: number, end?: number, contentType?: string): Blob {
        const blob = super.slice(start, end, contentType);

        return Object.setPrototypeOf(blob, Blob.prototype);
    }
}
