import { NotifierService } from './../../services/notifier/notifier.service';
import { Voluntario } from './../../models/voluntario.interface';
import { Funcao } from './../../models/funcao.interface';
import { VoluntarioService } from './../../services/voluntario/voluntario.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  readonly userForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    telefone: ['', [Validators.required]],
    funcoes: ['', [Validators.required]]
  });

  availableFunctions = ['Entregador', 'Cozinheiro', 'Coordenador']
    .map(((descricao: string, id: number) => ({
      id: ++id,
      descricao
    } as Funcao)));
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private voluntarioService: VoluntarioService,
    private notifierService: NotifierService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.logout();
  }

  private getVoluntarioFromForm(): Voluntario {
    return {
      nome: this.userForm.value.nome,
      telefone: this.userForm.value.telefone,
      usuario: {
        email: this.userForm.value.email,
        senha: this.userForm.value.senha,
      },
      funcoes: this.userForm.value.funcoes,
    };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.voluntarioService
        .saveOrUpdate(this.getVoluntarioFromForm())
        .subscribe(response => this.notifierService.showNotification(response.feedback));
    }
  }

  get userFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
}
