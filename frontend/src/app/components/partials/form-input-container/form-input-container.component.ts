import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input-container',
  standalone: true,
  imports: [],
  templateUrl: './form-input-container.component.html',
  styleUrl: './form-input-container.component.css'
})
export class FormInputContainerComponent {
  @Input() label!: string;
}
