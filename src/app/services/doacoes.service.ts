import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractService } from './abstract.service';
import { ContextService } from './context/context.service';
import { ServiceResponse } from './service-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DoacoesService extends AbstractService {
  private readonly DOACOES_API_PATH = `${this.contextService.apiUrl}/doacoes`;

  constructor(
    private httpClient: HttpClient,
    private contextService: ContextService
  ) {
    super();
  }

  public find(): Observable<ServiceResponse<number>> {
    return this.httpClient.get<ServiceResponse<number>>(`${this.DOACOES_API_PATH}`, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Doação atualizada')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<number>(err,
        'Erro ao receber valor das doações',
        [
          { statusCode: 404, feedback: { message: 'Doação não encontrada' } }
        ]
      ))
    );
  }

  public update(valor: number): Observable<ServiceResponse<number>> {
    return this.httpClient.put<ServiceResponse<number>>(`${this.DOACOES_API_PATH}`, {id: 1, valor}, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Doação atualizada')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<number>(err,
        'Erro ao atualizar a Doação',
        [
          { statusCode: 404, feedback: { message: 'Doação não encontrada' } }
        ]
      ))
    );
  }
}
