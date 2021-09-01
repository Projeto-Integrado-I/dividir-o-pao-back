import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/models/pedido.interface';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { NotaSolicitacaoModalComponent } from '../nota-pedido-modal/nota-pedido-modal.component';

@Component({
  selector: 'app-data-table-coordenador',
  templateUrl: './data-table-coordenador.component.html',
  styleUrls: ['./data-table-coordenador.component.scss','../../solicitacoes.component.scss']
})
export class DataTableCoordenadorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['createdDate', 'nome', 'valorTotal'];
  dataSource = new MatTableDataSource<Pedido>([]);

  constructor(
    private dialogRef: MatDialog,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    this.pedidoService.findAllByMonth(new Date())
        .subscribe(res => this.dataSource.data = res.content )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openNota(pedido: any): void {
    this.dialogRef.open(NotaSolicitacaoModalComponent, { data: pedido });
  }
  
}
