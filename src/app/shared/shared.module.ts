import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NotifierComponent } from './notifier/notifier.component';
import { BarraSecundariaComponent } from './barra-secundaria/barra-secundaria.component';

const angularModules = [
  ReactiveFormsModule,
  HttpClientModule,
];

const angularMaterial = [
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    NotifierComponent,
    ConfirmationDialogComponent,
    BreadcrumbHeaderComponent,
    BarraSecundariaComponent,
  ],
  imports: [
    CommonModule,
    ...angularModules,
    ...angularMaterial,
  ],
  exports: [
    ...angularModules,
    ...angularMaterial,
    BreadcrumbHeaderComponent,
    BarraSecundariaComponent
  ],
  providers: []
})
export class SharedModule { }
