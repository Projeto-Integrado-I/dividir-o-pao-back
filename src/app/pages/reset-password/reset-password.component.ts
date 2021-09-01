import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  readonly userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
  }
  get userFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
}


