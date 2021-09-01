import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProfileComponent } from './update-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateProfileRoutingModule } from './update-profile-routing.module';

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [CommonModule, UpdateProfileRoutingModule, SharedModule],
})
export class UpdateProfileModule {}
