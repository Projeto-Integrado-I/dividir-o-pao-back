import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Voluntario } from './../../models/voluntario.interface';
import { LoginService } from './../../services/login/login.service';
import { NotifierService } from './../../services/notifier/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.logout();
  }

  getUserFromForm(): Pick<Voluntario, 'usuario'> {
    return { usuario: this.userForm.value };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loginService.login(this.getUserFromForm()).subscribe((response) => {
        if (response.feedback.allOk) {
          this.router.navigate(['/home']);
        }
        this.notifierService.showNotification(response.feedback);
      });
    }
  }

  navigateToSignup() {
    this.router.navigate(['signup']);
  }

  get userFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
}
