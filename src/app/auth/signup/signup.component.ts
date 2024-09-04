import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  errorExists = false;
  errorText = "";
  errorNameText = "";
  errorEmailText = "";
  errorPasswordText = "";
  errorPhoneNumText = "";
  errorAddressText = "";
  errorAcceptanceText = "";

  constructor (private userService: UserService, private router: Router){}

  onSubmit(form: NgForm){
    this.errorExists = false;
    var namePattern = /^[A-Z][a-z]{2,15}\s[A-Z][a-z]{2,15}$/;
    var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,127}$/;
    var phoneNumPattern = /^([0-9]{3}\s?[0-9]{6,7}){1}$/;
    var addressPattern = /^[A-z,a-z,\s,0-9]{2,40}$/;

    if(!namePattern.test(form.value.name)){
      this.errorExists = true;
      this.errorNameText = "Invalid name format!";
    }else{
      this.errorNameText = "";
    }
    if(!emailPattern.test(form.value.email)){
      this.errorExists = true;
      this.errorEmailText = "Invalid email format!";
    }else{
      this.errorEmailText = "";
    }
    if(!passwordPattern.test(form.value.password)){
      this.errorExists = true;
      this.errorPasswordText = "Password must have atleast 1 number, upper case and lowwer case letter!";
    }else{
      this.errorPasswordText = "";
    }
    if(!phoneNumPattern.test(form.value.phoneNum)){
      this.errorExists = true;
      this.errorPhoneNumText = "Invalid phone number format!";
    }else{
      this.errorPhoneNumText = "";
    }
    if(form.value.address == ""){

    }
    else if(!addressPattern.test(form.value.address)){
      this.errorExists = true;
      this.errorAddressText = "Invalid address format!";
    }else{
      this.errorAddressText = "";
    }
    if(form.value.acceptance == false){
      this.errorExists = true;
      this.errorAcceptanceText = "You must accept the terms of conditions of use.";
    }else{
      this.errorAcceptanceText = "";
    }
    if(this.errorExists){
      return;
    }
    // if(this.userService.getUserByPhoneNum(form.value.phoneNum)){
    //   this.errorExists = true;
    //   this.errorPhoneNumText = "Phone number already exists!";
    //   return;
    // }
    if(!this.userService.getUser(form.value.email)){
      this.errorExists = false;
      var newUser = this.userService.registerUser(
        form.value.name, form.value.email, form.value.password, form.value.phoneNum, form.value.date, form.value.address);
  
      this.router.navigate(['']);
    }else{
      this.errorExists = true;
      this.errorText = "User with this email already exists.";
    }

    
  }
}
