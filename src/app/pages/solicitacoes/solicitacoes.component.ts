import { Pedido } from 'src/app/models/pedido.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuncaoEnum } from 'src/app/models/funcao.enum';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { AddSolicitacaoModalComponent } from './components/add-solicitacao-modal/add-solicitacao-modal.component';
import { NotaSolicitacaoModalComponent } from './components/nota-pedido-modal/nota-pedido-modal.component';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})

export class SolicitacoesComponent implements OnInit {

  isCoordenador: boolean = false;

  pedido: any;
  voluntario!: Voluntario;

  anoString = new Date().getFullYear().toString();

  constructor(
    private dialogRef: MatDialog,
    private pedidoService: PedidoService,
    private loginService: LoginService
  ) {}

  openDialogAddSolicitacao(): void {
    this.dialogRef.open(AddSolicitacaoModalComponent);
  }

  openNota(pedido: any): void {
    this.dialogRef.open(NotaSolicitacaoModalComponent, { data: pedido });
  }

  ngOnInit(): void {
    this.voluntario = this.loginService.getVoluntarioLogado();
    this.isCoordenador = this.loginService.isCoordenador;

    this.pedidoService.findByMonthVoluntario(this.voluntario.id!, new Date())
      .subscribe(res => this.pedido = res.content);
  }

}
