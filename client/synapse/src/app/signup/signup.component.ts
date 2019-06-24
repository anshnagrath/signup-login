import { Component, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {  FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AppService } from '../app.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  subscription: Subscription;
  loginMethod: Boolean = true;
  inputType: string = 'password';
  loginEmailType: string='password'
  signUpForm: FormGroup;
  firstName : string;
  lastName  : string;
  password  : string;
  email     : string;
  mail      : string;
  pass      : string;
  loginForm : FormGroup;
  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private activateRoutes: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.appService.loginStatus.subscribe((status) => {
      this.loginMethod = status;
    });
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
   toggleLoginInputType(){
     if(this.loginEmailType=="password"){
       this.loginEmailType="text"
     }else if(this.loginEmailType=="text"){
      this.loginEmailType="password"
    }
   }
   toggleInputType(){
    if(this.inputType=="password"){
      this.inputType="text"
    }else if(this.inputType=="text"){
     this.inputType="password"
   }
  }
   passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if(password !== confirmPassword){ 
      return group.get('confirmPassword').setErrors({'matchPassword': true})
    }
  };
  signUp(formDirective){
    let obj={
      firstName:this.firstName,
      lastName:this.lastName, 
      password:this.password, 
      email : this.email    
    }
    
   const signupSub = this.appService.signUp(obj).subscribe((data)=>{
      if(data['status'].code == 200){
        formDirective.resetForm();
        this.signUpForm.reset();
        this.appService.openSnackBar("An email has been sent to your mail id please check to confirm","Sucess")
      }else if(data['status'].code == 400){
        this.appService.openSnackBar("Error While Sigining you in", "Error")
      }
    });
    // this.subscription.add(signupSub);
  }
  login(formDirective){
    let obj = {
      email: this.mail,
      password: this.pass
    }
   const loginSub = this.appService.login(obj).subscribe((data)=>{
      if(data['status'].code ==200){
        formDirective.resetForm();
        this.loginForm.reset();
        
        this.appService.openSnackBar("User login sucessfull","Sucess")
        this.router.navigate(["product"])
      }

      if (data['status'].code ==  400){
       this.appService.openSnackBar("Wrong Password", "Error")
     }
     else if (data['status'].code ==404){
       this.appService.openSnackBar("email not active", "Error")
     }
      else if (data['status'].code == 406) {
        this.appService.openSnackBar("Already a user", "Error")
      }
    })
    // this.subscription.add(loginSub);
  }
  ngOnDestroy(){
    (this.subscription)?this.subscription.unsubscribe() : '';
  }
}