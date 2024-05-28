import { restrictedWords } from './restricted-words';
import {FormControl} from "@angular/forms";



describe('restrictedWords Validator', () => {
  it('should return null if control value is empty', () => {
    const control = new FormControl('');
    const result = restrictedWords(control);
    expect(result).toBeNull();
  });
  it('should detect multiple restricted words lowercase or uppercase', () => {
    const control = new FormControl('Last ASS, fuck you');
    const result = restrictedWords(control);
    expect(result).toEqual({restrictedWords: 'ass, fuck'})
  });
  it('should return restricted words correctly even if they are substrings', () => {
    const control = new FormControl('This text contains assAndPussy.');
    const result = restrictedWords(control);
    expect(result).toEqual({ restrictedWords: 'ass, pussy' });
  });
});
