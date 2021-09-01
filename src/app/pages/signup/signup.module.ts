import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModule
  ]
})
export class SignUpModule { }
