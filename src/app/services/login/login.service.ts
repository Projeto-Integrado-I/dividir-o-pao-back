import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { FuncaoEnum } from 'src/app/models/funcao.enum';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { AbstractService } from '../abstract.service';
import { ContextService } from '../context/context.service';
import { ServiceResponse } from '../service-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends AbstractService {
  private static readonly KEY_USUARIO_LOGADO = 'voluntarioLogado';

  private readonly LOGIN_API_PATH = `${this.contextService.apiUrl}/voluntario/login`;

  constructor(
    private httpClient: HttpClient,
    private contextService: ContextService
  ) {
    super();
  }

  public login(
    usuario: Pick<Voluntario, 'usuario'>
  ): Observable<ServiceResponse<Voluntario>> {
    return this.httpClient
      .post<ServiceResponse<Voluntario>>(`${this.LOGIN_API_PATH}`, usuario, {
        observe: 'response',
      })
      .pipe(
        map((response) =>
          super.responseTreatment(response.body, 'Login realizado')
        ),
        tap((voluntarioServiceResponse) => {
          const voluntario = voluntarioServiceResponse.content;
          this.updateVoluntarioLogado(voluntario);
          return voluntarioServiceResponse;
        }),
        catchError((err: HttpErrorResponse) =>
          super.errorResponseTreatment<Voluntario>(
            err,
            'Erro ao validar login',
            [{ statusCode: 404, feedback: { message: 'Login não encontrado' } }]
          )
        )
      );
  }

  public isLogado(): boolean {
    try {
      return !!this.getVoluntarioLogado();
    } catch (error) {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem(LoginService.KEY_USUARIO_LOGADO);
  }

  public getVoluntarioLogado(): Voluntario {
    let voluntarioLogado;
    try {
      voluntarioLogado = JSON.parse(
        localStorage.getItem(LoginService.KEY_USUARIO_LOGADO) ?? ''
      );
    } catch (_e: any) {
      throw Error('Erro ao pegar usuário logado');
    }
    return voluntarioLogado;
  }

  public updateVoluntarioLogado(voluntario: Voluntario): Voluntario | null {
    localStorage.setItem(
      LoginService.KEY_USUARIO_LOGADO,
      JSON.stringify(voluntario)
    );

    return this.getVoluntarioLogado();
  }

  public get isCoordenador(): boolean {
    return this.isLogado()
      ? this.getVoluntarioLogado().funcoes.some(
          (f) => f.id === FuncaoEnum.COORDENADOR
        )
      : false;
  }

  public get isEntregadorOrCozinheiro(): boolean {
    return this.isLogado()
      ? this.getVoluntarioLogado().funcoes.some(
          (f) =>
            f.id === FuncaoEnum.COZINHEIRO
            ||
            f.id === FuncaoEnum.ENTREGADOR
        )
      : false;
  }
}
