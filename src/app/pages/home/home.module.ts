import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoacoesArrecadadasComponent } from './components/doacoes-arrecadadas/doacoes-arrecadadas.component';
import { ParceriasVoluntarioComponent } from './components/parcerias-voluntario/parcerias-voluntario.component';
import { AlterarDoacaoModalComponent } from './components/alterar-doacao-modal/alterar-doacao-modal.component';
import { InsumosMaisPedidosComponent } from './components/insumos-mais-pedidos/insumos-mais-pedidos.component';
import { UltimosInsumosSolicitadosComponent } from './components/ultimos-insumos-solicitados/ultimos-insumos-solicitados.component';
import { InsumoSolicitadoComponent } from './components/ultimos-insumos-solicitados/components/insumo-solicitado/insumo-solicitado.component';


@NgModule({
  declarations: [HomeComponent, DoacoesArrecadadasComponent, ParceriasVoluntarioComponent, AlterarDoacaoModalComponent, InsumosMaisPedidosComponent, UltimosInsumosSolicitadosComponent, InsumoSolicitadoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
