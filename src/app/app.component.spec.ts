import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ErrorHandlingService} from "./common/services/error-handling.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FormErrorComponent} from "./form-error/form-error.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let errorHandlingService: jasmine.SpyObj<ErrorHandlingService>;


  beforeEach(async () => {
    const errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['getErrorMessage', 'getAriaDescribedBy']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, BrowserAnimationsModule, AppComponent, FormErrorComponent],
      providers: [
        FormBuilder,
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    errorHandlingService = TestBed.inject(ErrorHandlingService) as jasmine.SpyObj<ErrorHandlingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are correctly filled', () => {
    component.contactForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      queryType: 'generalEnquiry',
      message: 'This is a test message',
      confirm: true,
    });
    expect(component.contactForm.valid).toBeTrue();
  });

  it('should have an invalid form when required fields are empty', () => {
    component.contactForm.setValue({
      firstName: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      queryType: 'generalEnquiry',
      message: 'This is a test message',
      confirm: true,
    });
    expect(component.contactForm.invalid).toBeTrue();
  });

  it('should mark all fields as touched and log the form value on invalid form submission', () => {
    component.contactForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      queryType: null,
      message: '',
      confirm: false,
    });
    component.onSubmit();

    expect(component.firstName.touched).toBeTrue();
    expect(component.lastName.touched).toBeTrue();
    expect(component.email.touched).toBeTrue();
    expect(component.queryType.touched).toBeTrue();
    expect(component.message.touched).toBeTrue();
    expect(component.confirm.touched).toBeTrue();
  });

  it('should reset the form and set submitted to true on valid form submission', () => {
    component.contactForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      queryType: 'generalEnquiry',
      message: 'This is a test message',
      confirm: true,
    });
    component.onSubmit();
    expect(component.submitted).toBeTrue();
    expect(component.contactForm.value).toEqual({
      firstName: null,
      lastName: null,
      email: null,
      queryType: null,
      message: null,
      confirm: null,
    });
  });

  it('should display success message after form submission', () => {
    component.contactForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      queryType: 'generalEnquiry',
      message: 'This is a test message',
      confirm: true,
    });
    component.onSubmit();
    fixture.detectChanges();

    const successMessage = fixture.debugElement.query(By.css('section[aria-live="polite"]'));
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toContain('Message Sent!');
  });
});
