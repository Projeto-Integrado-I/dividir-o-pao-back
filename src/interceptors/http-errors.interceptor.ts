import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements NestInterceptor {
  static readonly EXCEPTIONS_BY_ERROR = {
    ER_DUP_ENTRY: (error: Error) =>
      new ConflictException('Entrada de valor duplicada', error.message),
  };

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.toHttpException));
  }

  private toHttpException = (error) => {
    return throwError(() =>
      error instanceof HttpException
        ? error
        : this.getHttpExceptionByError(error),
    );
  };

  private getHttpExceptionByError(error: Error & { code: number }) {
    console.error(error);

    const getHttpException =
      HttpErrorsInterceptor.EXCEPTIONS_BY_ERROR[error.code];

    return getHttpException
      ? getHttpException(error)
      : new InternalServerErrorException('Erro Inesperado');
  }
}
