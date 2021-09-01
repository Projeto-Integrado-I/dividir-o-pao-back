import { NotifierService } from './../../../../services/notifier/notifier.service';
import { ItemPedido } from './../../../../models/itens-pedido.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Recurso } from 'src/app/models/recurso.interface';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { RecursoService } from 'src/app/services/recurso/recurso.service';
import { Voluntario } from './../../../../models/voluntario.interface';
import { LoginService } from './../../../../services/login/login.service';
import { Pedido } from 'src/app/models/pedido.interface';

@Component({
  selector: 'app-add-solicitacao-modal',
  templateUrl: './add-solicitacao-modal.component.html',
  styleUrls: ['./add-solicitacao-modal.component.scss']
})
export class AddSolicitacaoModalComponent implements OnInit {

  readonly solicitacaoForm = this.formBuilder.group({
    itensPedido: this.formBuilder.array([])
  });

  voluntario!: Voluntario;
  recursos: Array<Recurso> = [];

  constructor(
    private dialogRef: MatDialogRef<AddSolicitacaoModalComponent>,
    private formBuilder: FormBuilder,
    private recursoService: RecursoService,
    private pedidoService: PedidoService,
    private loginService: LoginService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.voluntario = this.loginService.getVoluntarioLogado();

    this.getListRecursos();
  }

  private getListRecursos() {
    this.recursoService.findByAllAtivos()
      .subscribe(resp => {
        if (resp.feedback.allOk) {
          this.recursos = resp.content;
          this.recursos.map(recurso => this.addItemPedido(recurso));
        } else {
          this.notifierService.showNotification(resp.feedback);
        }
      });
  }

  onSubmit(): void {
    const pedido = this.solicitacaoForm.getRawValue() as Pedido;
    pedido.voluntario = this.voluntario;
    pedido.itensPedido = pedido.itensPedido.filter(item => item.valor || item.quantidade);

    if (!pedido.itensPedido || pedido.itensPedido.length == 0) {
      this.notifierService.showNotification({
        title: 'Error',
        message: 'Coloque pelo menos um insumo na solicitação',
        severity: 'error',
      });

      return;
    }

    pedido.itensPedido.map((ip: ItemPedido) => {
      ip.quantidade = ip.quantidade ? ip.quantidade : 1;
      ip.valor = ip.valor ? ip.valor : 1;
    });

    this.pedidoService.save(pedido)
      .subscribe(response => {
        this.notifierService.showNotification(response.feedback);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get itensPedido() {
    return this.solicitacaoForm.controls['itensPedido'] as FormArray;
  }

  addItemPedido(recurso: Recurso) {
    const itemPedidoForm = this.formBuilder.group({
      recurso: new FormControl(recurso),
      quantidade: new FormControl(),
      valor: new FormControl()
    });

    this.itensPedido.push(itemPedidoForm);
  }

  public getNome(recurso: Recurso): string {
    return recurso.tipoMedida ? `${recurso.nome} (${recurso.tipoMedida})` : '';
  }

}
