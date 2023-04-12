import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseType } from './response.type';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map(data => ({
        success: this.isSuccessfulResponse(context),
        data,
      })),
    );
  }

  private isSuccessfulResponse(context: ExecutionContext): boolean {
    const status = context.switchToHttp().getResponse().statusCode;
    return status >= HttpStatus.OK && status < HttpStatus.BAD_REQUEST;
  }
}
