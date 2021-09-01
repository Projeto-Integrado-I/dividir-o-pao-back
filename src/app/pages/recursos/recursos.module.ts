import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { NovoRecursoModalComponent } from './components/novo-recurso-modal/novo-recurso-modal.component';
import { RecursoTableComponent } from './components/recurso-table/recurso-table.component';
import { RecursoDataService } from './recurso-data.service';
import { RecursosRoutingModule } from './recursos-routing.module';
import { RecursosComponent } from './recursos.component';

@NgModule({
  declarations: [RecursosComponent, RecursoTableComponent, NovoRecursoModalComponent],
  imports: [
    CommonModule,
    RecursosRoutingModule,
    SharedModule,
    CurrencyMaskModule,
  ],
  providers: [CurrencyPipe, RecursoDataService ]
})
export class RecursosModule { }
