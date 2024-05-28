import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
// @ts-ignore
import badWords from './badwords.json';
export function restrictedWords(control: AbstractControl): ValidationErrors | null {
  const { words } = badWords as { words: string[]};
  if (!control.value) {
    return null;
  }
  const invalidWords = words
    .map(w => control.value.toLowerCase().includes(w) ? w : null)
    .filter(w => w !== null);
  return invalidWords.length > 0 ? { restrictedWords: invalidWords.join(', ') } : null;
}

export const restrictedWordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return restrictedWords(control);
};
