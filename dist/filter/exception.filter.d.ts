import { ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class ExceptionFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: any, host: ArgumentsHost): void;
}
