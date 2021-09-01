import { LoginService } from 'src/app/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoacoesService } from 'src/app/services/doacoes.service';
import { AlterarDoacaoModalComponent } from '../alterar-doacao-modal/alterar-doacao-modal.component';

@Component({
  selector: 'app-doacoes-arrecadadas',
  templateUrl: './doacoes-arrecadadas.component.html',
  styleUrls: ['./doacoes-arrecadadas.component.scss'],
})
export class DoacoesArrecadadasComponent implements OnInit {
  public valor = 0;

  constructor(
    private dialogRef: MatDialog,
    private doacoesService: DoacoesService,
    private loginService: LoginService
  ) {}

  public get isCoordenador(): boolean {
    return this.loginService.isCoordenador;
  }

  ngOnInit(): void {
    this.doacoesService
      .find()
      .subscribe((res) => (this.valor = res.content));
  }

  openAlterarDoacao(): void {
    const dialog = this.dialogRef.open(AlterarDoacaoModalComponent, {
      data: {
        valorAtual: this.valor
      }
    });

    dialog.afterClosed().subscribe(result => this.valor = (result ?? this.valor));
  }

  onSubmit() {}
}
