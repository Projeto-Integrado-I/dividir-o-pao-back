import { RecursoService } from 'src/app/services/recurso/recurso.service';
import { Recurso } from 'src/app/models/recurso.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RecursoDataService {

  private recursosSource = new Subject<Array<Recurso>>();
  recursos$ = this.recursosSource.asObservable();

  constructor(
    private recursoService: RecursoService
  ) {
    this.atualizaListaRecursos();
  }

  public atualizaListaRecursos() {
    this.recursoService.findByAll()
      .subscribe(res => this.recursosSource.next(res.content));
  }

  public getRecursos() {
    return this.recursos$;
  }
}
