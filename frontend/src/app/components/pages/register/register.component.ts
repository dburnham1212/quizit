import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { FormInputComponent } from "../../partials/form-input/form-input.component";
import { FormButtonComponent } from "../../partials/form-button/form-button.component";
import { RouterModule } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [
      RouterModule,
      TitleComponent, 
      FormInputComponent, 
      FormButtonComponent,
      ReactiveFormsModule
    ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    })
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
  }
}
