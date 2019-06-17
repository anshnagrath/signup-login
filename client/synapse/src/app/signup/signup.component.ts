import { Component,Input } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
@Input() loginMethod: string;
  signUpForm: FormGroup
  constructor(private fb:FormBuilder) {
   this.signUpForm  = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
     password: new FormControl('', [Validators.required,validators.minLength(5), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{1,}$/)]),
      confirmPassword: new FormControl('')
    });
   }

pass(val){
  let r = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{0,}$/g
  console.log(r.test(val), this.signUpForm.get('password')))
}


}

