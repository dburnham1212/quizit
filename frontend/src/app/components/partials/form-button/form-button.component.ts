import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-button',
  standalone: true,
  imports: [],
  templateUrl: './form-button.component.html',
  styleUrl: './form-button.component.css'
})
export class FormButtonComponent {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text = "Submit";

  @Output() onClick = new EventEmitter();
} 
