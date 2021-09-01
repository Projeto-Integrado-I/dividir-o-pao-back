import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/models/pedido.interface';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { NotaSolicitacaoModalComponent } from '../nota-pedido-modal/nota-pedido-modal.component';

@Component({
  selector: 'app-data-table-voluntario',
  templateUrl: './data-table-voluntario.component.html',
  styleUrls: ['./data-table-voluntario.component.scss', '../../solicitacoes.component.scss']
})
export class DataTableVoluntarioComponent implements OnInit {

  @Input() voluntario!: Voluntario;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['createdDate', 'nome', 'valorTotal'];
  dataSource = new MatTableDataSource<Pedido>([]);

  constructor(
    private dialogRef: MatDialog,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    this.pedidoService.findAllByVoluntario(this.voluntario.id!)
      .subscribe(res => this.dataSource.data = res.content);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openNota(pedido: any): void {
    this.dialogRef.open(NotaSolicitacaoModalComponent, { data: pedido });
  }
}
