import { expect } from 'chai';
import { ExecutionContext } from '@nestjs/common';
import { of, Observable } from 'rxjs';

import { ResponseInterceptor } from '../../../src/core/response';
import { ResponseType } from '../../../src/core/response';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<string>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  const getArguments = (statusCode: number, result: string) => {
    const httpArgumentsHost = {
      getResponse: () => ({
        statusCode,
      }),
    };
    const context = {
      switchToHttp: () => httpArgumentsHost,
    } as ExecutionContext;

    const next = {
      handle: (): Observable<string> => {
        return of(result);
      },
    };

    return { context, next };
  };

  describe('intercept', () => {
    it('should return a response with success true for 2xx status codes', () => {
      const { context, next } = getArguments(200, 'Hello world');
      const observable: Observable<ResponseType<string>> = interceptor.intercept(context, next);

      observable.subscribe((response: ResponseType<string>) => {
        expect(response).to.deep.equal({
          success: true,
          data: 'Hello world',
        });
      });
    });

    it('should return a response with success false for 4/5xx status codes', () => {
      const { context, next } = getArguments(404, 'Not Found');
      const observable: Observable<ResponseType<string>> = interceptor.intercept(context, next);

      observable.subscribe((response: ResponseType<string>) => {
        expect(response).to.deep.equal({
          success: false,
          data: 'Not Found',
        });
      });
    });
  });
});
