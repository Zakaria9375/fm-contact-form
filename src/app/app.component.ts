import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormErrorComponent} from "./form-error/form-error.component";
import {restrictedWordsValidator} from "./common/validators/restricted-words";
import {ErrorHandlingService} from "./common/services/error-handling.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeUp', [
      state('in', style({
        opacity: 1,
      })),
      transition('void => *', [style({
        opacity: 0
      }),animate(300)])
    ])
  ]
})
export class AppComponent {
  state= 'in';
  submitted: boolean = false;
  contactForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
        restrictedWordsValidator,
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(2),
        restrictedWordsValidator,
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    queryType: ['', [Validators.required]],
    message: ['', [Validators.required, restrictedWordsValidator]],
    confirm: [false, [Validators.requiredTrue]],
  });
  constructor(private fb: FormBuilder,  private errorHandlingService: ErrorHandlingService) {}
  get firstName() {
    return this.contactForm.controls?.['firstName'];
  }
  get lastName() {
    return this.contactForm.controls?.['lastName'];
  }
  get email() {
    return this.contactForm.controls?.['email'];
  }
  get queryType() {
    return this.contactForm.controls?.['queryType'];
  }
  get message() {
    return this.contactForm.controls?.['message'];
  }
  get confirm() {
    return this.contactForm.controls?.['confirm'];
  }
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Valid form');
      this.submitted = true;
      this.contactForm.reset();
    } else {
      console.log('Invalid Form');
      this.contactForm.markAllAsTouched();
      console.log(this.contactForm.getRawValue())
    }
  }
  getAriaDescribedBy(field: string): string {
    const control = this.contactForm.get(field) as FormControl;
    return this.errorHandlingService.getAriaDescribedBy(control, field);
  }
}
