import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Interceptor } from './interceptors/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './guards/auth-guard.service';



@NgModule({
  declarations: [PageContainerComponent, HeaderComponent, FooterComponent],
  exports: [PageContainerComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    AuthGuardService,
    Interceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
