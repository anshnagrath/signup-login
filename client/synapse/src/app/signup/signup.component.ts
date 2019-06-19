import { Component,Input } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, ValidatorFn,Validators, AbstractControl} from '@angular/forms';
import { AppService } from '../app.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
@Input() loginMethod: string;
  signUpForm: FormGroup;
  firstName : string;
  lastName  : string;
  password  : string;
  email     : string;
  mail      : string;
  pass      : string;
  loginForm : FormGroup;
  constructor(private fb: FormBuilder, private appService: AppService) {
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
   this.loginForm  = this.fb.group({
    mail: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    pass: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
    
 });
  }

   passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if(password !== confirmPassword){ 
      return group.get('confirmPassword').setErrors({'matchPassword': true})
    }
  };
  signUp(){
    let obj={
      firstName:this.firstName,
      lastName:this.lastName, 
      password:this.password, 
      email : this.email    
    }
    
    this.appService.signUp(obj).subscribe((data)=>{
      if(data.status.code == 200){
        this.appService.openSnackBar("An email has been sent to your mail id please check to confirm","Sucess")
      }else{
        this.appService.openSnackBar("Error While Sigining you in", "Error")
      }
    })
  }
  login(){
    let obj = {
      email: this.mail,
      pass: this.password
    }
    this.appService.login(obj).subscribe((data)=>{
      if(data.status.code ==200){
        this.appService.openSnackBar("User login sucessfull","Sucess")
      }else{
        this.appService.openSnackBar("Error While logging in", "Error")
      }
    })
  }
}