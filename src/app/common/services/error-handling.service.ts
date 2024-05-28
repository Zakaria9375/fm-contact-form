import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  private errorIdMap: { [key: string]: string } = {
    required: 'This field is required.',
    pattern: 'Only letters are allowed.',
    minlength: 'Minimum length is ',
    email: 'Please enter a valid email address.',
    restrictedWords: 'Restricted words found: ',
  };

  getErrorMessage(control: FormControl<any> | undefined, field: string): { id: string, message: string }[] {
    //conditions evaluates to be true if one of those is true
    if (!control || !control.errors || !control.touched) {
      return [];
    }
    return Object.keys(control.errors).map(errorKey => {
      let message = this.errorIdMap[errorKey] || 'Invalid input';
      if(field === 'confirm') {
        message = 'You must consent to be contacted.'
      }
      if (errorKey === 'minlength') {
        message += `${control.errors?.[errorKey].requiredLength} characters.`;
      } else if (errorKey === 'restrictedWords') {
        message += `${control.errors?.[errorKey]}`;
      }

      return {
        id: `${field}Err-${errorKey}`,
        message: message
      };
    });
  }

  getAriaDescribedBy(control: FormControl | null, field: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    return Object.keys(control.errors)
      .map((key) => `${field}Err-${key}`)
      .join(' ');
  }
}
