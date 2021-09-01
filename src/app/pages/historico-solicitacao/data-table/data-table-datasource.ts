import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MatButton } from '@angular/material/button';

export interface DataTableItem {
  nome: string;
  data: string;
  valor: string;
}

const EXAMPLE_DATA: DataTableItem[] = [
  {data: '21 SET', nome: 'Maria Helena' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'José Luiz' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Nanda Viana' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Alberto Botelho' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Boronesa Alcantara' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Carbonara Cocielo' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Nick Brasi' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Olivia Palito' , valor: 'R$ 120,00'},
  {data: '21 SET', nome: 'Fluorine de Jesus' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Neo Patrix' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Solange Almeida' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Magnum Prata' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Aluisio de Melo' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Silvia Silveira' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Alphonso José' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Suzana Viana' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Chloe Cristina' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Arthue Valdivino' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Pedro Felipe' , valor: 'R$ 120,00'},
  {data:  '21 SET', nome: 'Carol Almeida' , valor: 'R$ 120,00'},
];

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}
 
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nome': return compare(a.nome, b.nome, isAsc);
        case 'data': return compare(+a.data, +b.data, isAsc);
        case 'valor': return compare(+a.valor, +b.valor, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
