import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputContainerComponent } from './form-input-container.component';

describe('FormInputContainerComponent', () => {
  let component: FormInputContainerComponent;
  let fixture: ComponentFixture<FormInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
