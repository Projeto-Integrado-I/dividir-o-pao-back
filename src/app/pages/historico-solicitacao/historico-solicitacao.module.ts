import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoSolicitacaoRoutingModule } from './historico-solicitacao-routing.module';
import { HistoricoSolicitacaoComponent } from './historico-solicitacao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [HistoricoSolicitacaoComponent, DataTableComponent],
  imports: [
    CommonModule,
    HistoricoSolicitacaoRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class HistoricoSolicitacaoModule { }