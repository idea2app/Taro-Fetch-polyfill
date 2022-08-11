import { Headers } from './Headers';
import { Body } from './Body';
import { Request } from './Request';
import { Response } from './Response';
import { fetch } from './fetch';

for (const [key, value] of Object.entries({
    Headers,
    Body,
    Request,
    Response,
    fetch
}))
    globalThis[key] = value;

export * from './Headers';
export * from './Body';
export * from './Request';
export * from './Response';
export * from './fetch';
