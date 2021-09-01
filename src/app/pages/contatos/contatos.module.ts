import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './contatos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardContatoComponent } from './components/card-contato/card-contato.component';


@NgModule({
  declarations: [ContatosComponent, CardContatoComponent],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    SharedModule
  ]
})
export class ContatosModule { }