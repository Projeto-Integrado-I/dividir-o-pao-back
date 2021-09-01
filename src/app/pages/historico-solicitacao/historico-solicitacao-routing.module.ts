import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoSolicitacaoComponent } from './historico-solicitacao.component';

const routes: Routes = [
  { path: '', component: HistoricoSolicitacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoSolicitacaoRoutingModule { }