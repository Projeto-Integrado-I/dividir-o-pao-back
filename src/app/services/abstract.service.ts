import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Feedback } from './feedback.interface';
import { ServiceResponse } from './service-response.interface';

export interface FeedbackByStatusCode {
  readonly statusCode: number;
  readonly feedback: Partial<Feedback> & Required<Pick<Feedback, 'message'>>;
}

export abstract class AbstractService {
   private static readonly STANDARD_FEEDBACKS_BY_STATUS_CODE: FeedbackByStatusCode[] = [
    { statusCode: 0, feedback: { message: 'Não foi possível estabelecer conexão com o servidor' } },
    { statusCode: 400, feedback: { message: 'Erro na validação de dados' } },
    { statusCode: 500, feedback: { message: 'Erro interno no servidor' } },
  ];
  protected static readonly STANDARD_ERROR_MESSAGE = 'Ocorreu um erro inesperado.';

  protected responseTreatment<R>(content: R, successMessage: string): ServiceResponse<R> {
    return {
      content,
      feedback: {
        message: successMessage,
        severity: 'success',
        title: 'Sucesso',
        allOk: true
      }
    } as ServiceResponse<R>;
  }

 protected errorResponseTreatment<R>(
    httpErrorResponse: HttpErrorResponse,
    genericErrorMessage: string,
    availableFeedbacks: FeedbackByStatusCode[] = []
  ): Observable<ServiceResponse<R>> {

    availableFeedbacks.push(...AbstractService.STANDARD_FEEDBACKS_BY_STATUS_CODE);
    const feedbackByStatusCode = availableFeedbacks.find(feedback => feedback.statusCode === httpErrorResponse.status);

    return of({
      content: null,
      feedback: {
        message: feedbackByStatusCode?.feedback?.message ?? genericErrorMessage ?? AbstractService.STANDARD_ERROR_MESSAGE,
        severity: 'error',
        title: feedbackByStatusCode?.feedback?.title ?? 'Alerta',
        allOk: false
      }
    } as ServiceResponse<R>);
  }
}
