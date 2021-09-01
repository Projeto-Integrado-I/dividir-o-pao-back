import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { TipoRecurso } from 'src/app/models/tipo-recurso.enum';
import { RecursoService } from 'src/app/services/recurso/recurso.service';
import { ConfirmationDialogComponent, ConfirmationDialogParams } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Recurso } from '../../../../models/recurso.interface';
import { RecursoDataService } from '../../recurso-data.service';
import { NovoRecursoModalComponent } from '../novo-recurso-modal/novo-recurso-modal.component';

@Component({
  selector: 'app-recurso-table',
  templateUrl: './recurso-table.component.html',
  styleUrls: ['./recurso-table.component.scss']
})
export class RecursoTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Recurso>([]);

  displayedColumns = ['nome', 'custo', 'categoria', 'status', 'acoes'];

  recursoSelecionado: Recurso | undefined;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private recursoDataService: RecursoDataService,
    private recursoService: RecursoService,
    private dialogRef: MatDialog,
  ) {
    this.matIconRegistry.addSvgIcon(
      `edit`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/icons/svg/pencil.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `delete`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../../../../assets/icons/svg/trash.svg`)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.recursoDataService.getRecursos()
      .subscribe(res => this.dataSource.data = res)
  }

  getNome(recurso: Recurso): string {
    return recurso && recurso.tipoMedida ? `${recurso.nome} (${recurso.tipoMedida})` : '';
  }

  getStatus(ativo: boolean): string {
    return ativo ? 'ATIVO' : 'INATIVO';
  }

  getTipoRecursoCapitalized(tipoRecurso: TipoRecurso) {
    return tipoRecurso.charAt(0).toUpperCase() + tipoRecurso.slice(1).toLowerCase();
  }

  openAdicionarRecurso(): void {
    this.dialogRef.open(NovoRecursoModalComponent);
  }

  openRecursoEdicao(recurso: Recurso): void {
    this.dialogRef.open(NovoRecursoModalComponent, { data: recurso });
  }

  openRecursoDelecao(recurso: Recurso): void {
    this.recursoSelecionado = recurso;

    this.dialogRef.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que você quer excluir esse insumo?',
        onYes: () => this.deleteRecurso(),
        onNo: () => this.limpaRecursoSelecionado()
      } as ConfirmationDialogParams,
    });
  }

  private deleteRecurso() {
    if (this.recursoSelecionado && this.recursoSelecionado.id)
      this.recursoService.deleteById(this.recursoSelecionado.id)
        .subscribe(() => this.recursoDataService.atualizaListaRecursos());
  }

  private limpaRecursoSelecionado() {
    this.recursoSelecionado = undefined;
  }


}
