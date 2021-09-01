import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { ContextService } from '../context/context.service';
import { CrudService } from '../crud.service';
import { ServiceResponse } from './../service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService extends CrudService<Voluntario> {
  private readonly VOLUNTARIO_API_PATH = `${this.contextService.apiUrl}/voluntario`;

  constructor(private httpClient: HttpClient, private contextService: ContextService) {
    super();
  }

  public saveOrUpdate(voluntario: Voluntario): Observable<ServiceResponse<Voluntario>> {
    return voluntario.id ? this.update(voluntario) : this.save(voluntario);
  }

  protected update(voluntario: Voluntario): Observable<ServiceResponse<Voluntario>> {
    return this.httpClient.put<ServiceResponse<Voluntario>>(`${this.VOLUNTARIO_API_PATH}/${voluntario.id}`, voluntario, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Voluntário atualizado')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Voluntario>(err,
        'Erro ao atualizar o voluntário',
        [
          { statusCode: 404, feedback: { message: 'Voluntário não encontrado' } }
        ]
      ))
    );
  }

  protected save(voluntario: Voluntario): Observable<ServiceResponse<Voluntario>> {
    return this.httpClient.post<ServiceResponse<Voluntario>>(`${this.VOLUNTARIO_API_PATH}`, voluntario, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response, 'Cadastro salvo')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Voluntario>(err,
        'Erro ao efetuar cadastro',
        [
          { statusCode: 409, feedback: { message: 'Este email já está sendo utilizado' } }
        ]
      ))
    );
  }

  public findById(id: number): Observable<ServiceResponse<Voluntario>> {
    return this.httpClient.get<ServiceResponse<Voluntario>>(`${this.VOLUNTARIO_API_PATH}/${id}`, {
      observe: 'response'
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Voluntário encontrado')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Voluntario>(err,
        'Erro ao buscar voluntário',
        [
          { statusCode: 404, feedback: { message: 'Voluntário não encontrado' } }
        ]
      ))
    );
  }

  public deleteById(id: number): Observable<ServiceResponse<null>> {
    return this.httpClient.delete<HttpResponse<null>>(`${this.VOLUNTARIO_API_PATH}/${id}`, {
      observe: 'response',
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Voluntário excluído')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Voluntario>(err,
        'Erro ao excluir voluntário',
        [
          { statusCode: 404, feedback: { message: 'Voluntário não encontrado' } }
        ]
      ))
    );
  }

  findAll() {
    return this.httpClient.get<ServiceResponse<Voluntario[]>>(`${this.VOLUNTARIO_API_PATH}`, {
      observe: 'response',
    }).pipe(
      map(response => this.responseTreatment(response.body, 'Contatos encontrados')),
      catchError((err: HttpErrorResponse) => this.errorResponseTreatment<Voluntario>(err,
        'Erro ao buscar contatos',
      ))
    );
  }
}
