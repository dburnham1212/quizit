import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'form-input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input-validation.component.html',
  styleUrl: './form-input-validation.component.css'
})
export class FormInputValidationComponent implements OnInit, OnChanges{
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen:boolean = true;
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  checkValidation() {
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
