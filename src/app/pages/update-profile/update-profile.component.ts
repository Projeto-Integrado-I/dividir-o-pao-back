import { ActivatedRoute, Router } from '@angular/router';
import { Voluntario } from 'src/app/models/voluntario.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogParams,
} from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Funcao } from 'src/app/models/funcao.interface';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {

  voluntario: Voluntario | null = null;

  hidePassword = true;

  readonly userForm: FormGroup = this.formBuilder.group({
    nome: [this.voluntario?.nome, [Validators.required]],
    email: [
      this.voluntario?.usuario.email,
      [Validators.required, Validators.email],
    ],
    /* senha: [
      { value: this.voluntario?.usuario.senha, disabled: true },
      [Validators.required, Validators.minLength(6)],
    ], */
    telefone: [
      this.voluntario?.telefone,
      [Validators.required, Validators.pattern('^[0-9]*$')],
    ],
    funcoes: [this.voluntario?.funcoes, [Validators.required]]
  });

  constructor(
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.router.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.voluntario = params['voluntario'] as Voluntario ?? this.loginService.getVoluntarioLogado();
      this.populateFields();
    });
  }

  getFuncoes(): string {
    return this.voluntario?.funcoes.map((funcao: Funcao) => funcao.descricao).join(' | ') || '';
  }

  private populateFields(): void {
    this.userForm.controls.nome.setValue(this.voluntario?.nome);
    this.userForm.controls.email.setValue(this.voluntario?.usuario.email);
    //this.userForm.controls.senha.setValue(this.voluntario?.usuario.senha);
    this.userForm.controls.telefone.setValue(this.voluntario?.telefone);
  }

  ngOnInit(): void { }

  openDialog(): void {
    console.log(this.userForm.valid);

    this.userForm.valid &&
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Tem certeza que você quer alterar seu perfil?',
          onYes: this.onSubmit,
        } as ConfirmationDialogParams,
      });
  }

  onSubmit(): void {
    alert('fon')
  }

  get userFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
}
