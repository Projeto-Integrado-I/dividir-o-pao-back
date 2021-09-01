import { Voluntario } from 'src/app/models/voluntario.interface';
import { Component, OnInit } from '@angular/core';
import { VoluntarioService } from 'src/app/services/voluntario/voluntario.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  voluntarios: Voluntario[] = [];

  constructor(
    private voluntarioService: VoluntarioService
  ) { }

  ngOnInit(): void {
    this.voluntarioService.findAll()
      .subscribe(resp => this.voluntarios = resp.content);
  }

  getFuncoes(voluntario: Voluntario): string {
    return voluntario.funcoes.map(f => f.descricao).join(' - ');
  }

  getMaskTelefone(telefone: string): string {
    if (!telefone) {
      return '';
    }

    return telefone.length === 10 ? this.transformMask(telefone, '(##) ####-####') : this.transformMask(telefone,'(##) #####-####');
  }

  private transformMask(value: string, mask: string) {
    value.split('').forEach((num) => (mask = mask.replace('#', num)));
    return mask;
  }

}
