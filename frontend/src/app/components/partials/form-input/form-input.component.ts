import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormInputContainerComponent } from '../form-input-container/form-input-container.component';
import { FormInputValidationComponent } from "../form-input-validation/form-input-validation.component";
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'form-input',
    standalone: true,
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.css',
    imports: [
        CommonModule,
        FormInputContainerComponent,
        FormInputValidationComponent
    ]
})
export class FormInputComponent {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' = "text";
}
