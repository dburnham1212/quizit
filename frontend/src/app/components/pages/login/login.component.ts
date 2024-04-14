import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../partials/title/title.component";
import { FormInputComponent } from '../../partials/form-input/form-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormButtonComponent } from "../../partials/form-button/form-button.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        TitleComponent,
        ReactiveFormsModule,
        FormInputComponent,
        FormButtonComponent
    ]
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
  }
}
