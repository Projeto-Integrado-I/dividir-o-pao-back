import { Funcao } from 'src/app/models/funcao.interface';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  voluntario!: Voluntario;

  constructor(
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.voluntario = this.loginService.getVoluntarioLogado();
  }

  public get isCoordenador(): boolean {
    return this.loginService.isCoordenador;
  }

  public get isEntregadorOrCozinheiro(): boolean {
    return this.loginService.isEntregadorOrCozinheiro;
  }

  getFuncoes(): string {
    return (
      this.voluntario?.funcoes
        .map((funcao: Funcao) => funcao.descricao)
        .join(' | ') || ''
    );
  }
}
