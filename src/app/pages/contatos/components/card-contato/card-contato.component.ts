import { Component, OnInit, Input } from '@angular/core';
import { Voluntario } from 'src/app/models/voluntario.interface';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.scss']
})
export class CardContatoComponent implements OnInit {

  @Input() contato!: Voluntario;  

  constructor() { }

  ngOnInit(): void {
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
