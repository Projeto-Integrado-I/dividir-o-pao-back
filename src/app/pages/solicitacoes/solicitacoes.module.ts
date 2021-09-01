import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSolicitacaoModalComponent } from './components/add-solicitacao-modal/add-solicitacao-modal.component';
import { DataTableCoordenadorComponent } from './components/data-table-coordenador/data-table-coordenador.component';
import { DataTableVoluntarioComponent } from './components/data-table-voluntario/data-table-voluntario.component';
import { NotaSolicitacaoModalComponent } from './components/nota-pedido-modal/nota-pedido-modal.component';
import { SolicitacoesRoutingModule } from './solicitacoes-routing.module';
import { SolicitacoesComponent } from './solicitacoes.component';


@NgModule({
  declarations: [
    SolicitacoesComponent,
    AddSolicitacaoModalComponent,
    DataTableCoordenadorComponent,
    DataTableVoluntarioComponent,
    NotaSolicitacaoModalComponent,
  ],
  imports: [
    CommonModule,
    SolicitacoesRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    CurrencyMaskModule
  ],
  providers: [CurrencyPipe]
})
export class SolicitacoesModule { }