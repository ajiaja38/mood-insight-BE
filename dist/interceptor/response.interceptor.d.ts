import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageService } from '../app/message/message.service';
import { ImetaPagination } from '../types/interface/IResPageWrapper.interface';
import { IResponseEntity } from '../types/interface/IResponseEntity.interface';
interface IResponseWithMeta<D> {
    data: D;
    meta: ImetaPagination;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T | unknown[] | IResponseWithMeta<T>, IResponseEntity<T>> {
    private readonly messageService;
    constructor(messageService: MessageService);
    intercept(context: ExecutionContext, next: CallHandler<T | unknown[] | IResponseWithMeta<T>>): Observable<IResponseEntity<T>>;
}
export {};
