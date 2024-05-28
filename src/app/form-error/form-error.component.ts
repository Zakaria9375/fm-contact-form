import { Component , Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ErrorHandlingService} from "../common/services/error-handling.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
  animations: [
    trigger('enter', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)',
      })),
      transition('void => *', [style({
        opacity: 0,
        transform: 'translateX(-5px)',
      }),
        animate(300)
      ])
    ])
  ]
})
export class FormErrorComponent {
  @Input() control: FormControl<any> | undefined = undefined;
  @Input() errId: string = ''
  constructor(private errorHandlingService: ErrorHandlingService) {
  }

  get errorMessages(): {id: string, message: string}[] {
    return this.errorHandlingService.getErrorMessage(this.control, this.errId);
  }
}
