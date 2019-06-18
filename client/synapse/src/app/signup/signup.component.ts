import { Component,Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, ValidatorFn,Validators, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
@Input() loginMethod: string;
  signUpForm: FormGroup;
  constructor(private fb:FormBuilder,public changeDetection:ChangeDetectorRef) {
   this.signUpForm  = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
     password: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(5), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{1,}$/)]],
      confirmPassword: ['', Validators.required],
   }, {
      validator: this.passwordMatchValidator
    }
   );
  }

   passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if(password !== confirmPassword){ 
      return group.get('confirmPassword').setErrors({'matchPassword': true})
    }
  };
}