import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'src/app/message/message.service';
import { ImetaPagination } from 'src/types/interface/IResPageWrapper.interface';
import { IResponseEntity } from 'src/types/interface/IResponseEntity.interface';

interface IResponseWithMeta<D> {
  data: D;
  meta: ImetaPagination;
}

@Injectable()
export class ResponseInterceptor<T>
  implements
    NestInterceptor<T | unknown[] | IResponseWithMeta<T>, IResponseEntity<T>>
{
  constructor(private readonly messageService: MessageService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T | unknown[] | IResponseWithMeta<T>>,
  ): Observable<IResponseEntity<T>> {
    return next.handle().pipe(
      map((res: T | unknown[] | IResponseWithMeta<T>) => {
        const statusCode: number = context
          .switchToHttp()
          .getResponse().statusCode;

        const response: IResponseEntity<T> = {
          code: statusCode,
          status: true,
          message:
            this.messageService.getMessage() || 'Successfully retrieve data',
        };

        if (Array.isArray(res)) {
          response.data = res as unknown as T;
        } else if (
          res !== null &&
          typeof res === 'object' &&
          'data' in (res as object) &&
          'meta' in (res as object)
        ) {
          const wrapped = res as IResponseWithMeta<T>;
          response.data = wrapped.data;
          response.meta = wrapped.meta;
        } else {
          response.data = res as T;
        }

        return response;
      }),
    );
  }
}
