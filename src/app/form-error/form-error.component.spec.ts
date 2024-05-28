import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorComponent } from './form-error.component';
import {ErrorHandlingService} from "../common/services/error-handling.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {FormControl} from "@angular/forms";

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;
  let errorHandlingService: jasmine.SpyObj<ErrorHandlingService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['getErrorMessage']);

    await TestBed.configureTestingModule({
      imports: [FormErrorComponent],
      providers: [
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    errorHandlingService = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not display error messages when control is not touched', () => {
    const control = new FormControl();
    control.setErrors({ required: true });

    component.control = control;
    fixture.detectChanges();

    const errorMessages = debugElement.queryAll(By.css('p'));

    expect(errorMessages.length).toBe(0);
  });

  it('should display error messages when control is touched and has errors', () => {
    const mockErrorMessages = [
      { id: 'error1', message: 'Error message 1' },
      { id: 'error2', message: 'Error message 2' }
    ];

    const control = new FormControl();
    control.setErrors({ required: true });
    control.markAsTouched();

    errorHandlingService.getErrorMessage.and.returnValue(mockErrorMessages);
    component.control = control;
    fixture.detectChanges();

    const errorMessages = debugElement.queryAll(By.css('p'));

    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].nativeElement.textContent).toBe('Error message 1');
    expect(errorMessages[1].nativeElement.textContent).toBe('Error message 2');
  });
});
