import { ItemPedido } from './../../../../models/itens-pedido.interface';
import { Recurso } from 'src/app/models/recurso.interface';
import { Pedido } from 'src/app/models/pedido.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoRecurso } from 'src/app/models/tipo-recurso.enum';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-nota-pedido-modal',
  templateUrl: './nota-pedido-modal.component.html',
  styleUrls: ['./nota-pedido-modal.component.scss']
})
export class NotaSolicitacaoModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NotaSolicitacaoModalComponent>,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
  }

  public getNome(recurso: Recurso): string {
    return recurso && recurso.tipoMedida ? `${recurso.nome} (${recurso.tipoMedida})` : '';
  }

  public getQuantidadeOuPreco(itemPedido: ItemPedido): string {
    if (!itemPedido)
      return '';

    return itemPedido.recurso.tipoRecurso == TipoRecurso.INSUMO ?
      `${itemPedido.quantidade} ${itemPedido.recurso.tipoMedida}`
      : this.currencyPipe.transform(itemPedido.valor, 'BRL')!
  }

  closeDialog(): void {
    this.data = undefined;
    this.dialogRef.close();
  }
}
