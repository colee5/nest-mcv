import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  UseInterceptors,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize(dto: Type<any>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          // This is the absolute key to make this interceptor working
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
