import { AbstractControl } from '@angular/forms';
export function  passwordValidator (control: AbstractControl): { [key: string]: boolean }  {
    const password = control.get('password');
    if (password) {
        console.log(password.value)
    return password.value.length === 5 ? null : { invalidLength: true };
    }
}