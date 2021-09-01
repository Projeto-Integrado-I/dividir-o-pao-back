import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Recurso } from 'src/app/models/recurso.interface';
import { ContextService } from '../context/context.service';
import { CrudService } from '../crud.service';
import { ServiceResponse } from './../service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RecursoService extends CrudService<Recurso> {
  private readonly RECURSO_API_PATH = `${this.contextService.apiUrl}/recurso`;

  constructor(private httpClient: HttpClient, private contextService: ContextService) {
    super();
  }

  public saveOrUpdate(recurso: Recurso): Observable<ServiceResponse<Recurso>> {
    return recurso.id ? this.update(recurso) : this.save(recurso);
  }

  protected update(recurso: Recurso): Observable<ServiceResponse<Recurso>> {
    return this.httpClient.put<ServiceResponse<Recurso>>(`${this.RECURSO_API_PATH}/${recurso.id}`, recurso, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response, 'Recurso atualizado')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao atualizar o recurso',
        [
          { statusCode: 404, feedback: { message: 'Produto não encontrado' } }
        ]
      ))
    );
  }

  protected save(recurso: Recurso): Observable<ServiceResponse<Recurso>> {
    return this.httpClient.post<ServiceResponse<Recurso>>(`${this.RECURSO_API_PATH}`, recurso, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response, 'Cadastro salvo')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao efetuar cadastro',
        [
          { statusCode: 409, feedback: { message: 'Este produto já está cadastrado' } }
        ]
      ))
    );
  }

  public findById(id: number): Observable<ServiceResponse<Recurso>> {
    return this.httpClient.get<ServiceResponse<Recurso>>(`${this.RECURSO_API_PATH}/${id}`, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response, 'Produto encontrado')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao buscar produto',
        [
          { statusCode: 404, feedback: { message: 'Produto não encontrado' } }
        ]
      ))
    );
  }

  public deleteById(id: number): Observable<ServiceResponse<null>> {
    return this.httpClient.delete<HttpResponse<null>>(`${this.RECURSO_API_PATH}/${id}`, {
      observe: 'response',
    }).pipe(
      map(response => this.responseTreatment(response, 'Produto excluído')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao excluir Produto',
        [
          { statusCode: 404, feedback: { message: 'Produto não encontrado' } }
        ]
      ))
    );
  }

  public findByAll(): Observable<ServiceResponse<Recurso[]>> {
    return this.httpClient.get<ServiceResponse<Recurso[]>>(`${this.RECURSO_API_PATH}`, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Produtos encontrados')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao buscar produtos',
      ))
    );
  }

  public findByAllAtivos(): Observable<ServiceResponse<Recurso[]>> {
    return this.httpClient.get<ServiceResponse<Recurso[]>>(`${this.RECURSO_API_PATH}/ativos`, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Insumos encontrados')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Recurso>(err,
        'Erro ao buscar insumos',
      ))
    );
  }
}

