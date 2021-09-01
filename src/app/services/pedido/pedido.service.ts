import { catchError, map } from 'rxjs/operators';
import { ServiceResponse } from './../service-response.interface';
import { Pedido } from './../../models/pedido.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '../abstract.service';
import { ContextService } from '../context/context.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends AbstractService {
  private readonly PEDIDO_API_PATH = `${this.contextService.apiUrl}/pedido`;

  constructor(private httpClient: HttpClient, private contextService: ContextService) {
    super();
  }

  save(pedido: Pedido): Observable<ServiceResponse<Pedido>> {
    return this.httpClient.post<ServiceResponse<Pedido>>(`${this.PEDIDO_API_PATH}`, pedido, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Solicitação salva')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Pedido>(err,
        'Erro ao efetuar cadastro de solicitação',
      ))
    );
  }

  findByMonthVoluntario(idVoluntario: number, dateMonth: Date) {
    const params = new HttpParams().set('dateMonth', dateMonth.toISOString());
    return this.httpClient.get<ServiceResponse<any>>(`${this.PEDIDO_API_PATH}/${idVoluntario}/month`, {
      observe: 'response',
      params: params
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Solicitação encontrada')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<any>(err,
        'Erro ao buscar solicitação do mês',
      ))
    );
  }

  findAllByMonth(dateMonth: Date) {
    const params = new HttpParams().set('dateMonth', dateMonth.toISOString());
    return this.httpClient.get<ServiceResponse<any[]>>(`${this.PEDIDO_API_PATH}/month`, {
      observe: 'response',
      params: params
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Solicitações encontradas')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<any>(err,
        'Erro ao buscar solicitações do mês',
      ))
    );
  }

  findAllByVoluntario(idVoluntario: number) {
    return this.httpClient.get<ServiceResponse<any[]>>(`${this.PEDIDO_API_PATH}/find-by-voluntario/${idVoluntario}`, {
      observe: 'response',
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Solicitações encontradas')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<any>(err,
        'Erro ao buscar solicitações',
      ))
    );
  }
}
