import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Users } from '../users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  constructor(private authenticationservice:AuthenticationService) { }
 
  //toggle login error alert Message.
   alert: boolean = false;

  //login Response Holder
  public userData = {};

  loader: boolean = false;

   //login credentials
   credential = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
     //if already login send user to pension-details.
     if (sessionStorage.getItem('token')) {
      window.location.href = '/pensiondetails';
      // location.pathname="/pensiondetails"
    }
  }
  // newUser(){
  //   alert("Temporary service is closed.\nThanks for visit")

  // }

  userLogin(){
    this.loader = true;
    
    this.authenticationservice.getLogedIn(this.credential.value).subscribe(
       (value) => {
        this.loader = false;
        if (value.token) {
          //if login successfull storing jwt token to session storage.
          sessionStorage['token'] = value.token;

          window.location.href = '/pensiondetails';
        }
        //if login failed making alert message visible.
        
        else alert("Invalid credentials!\nTry again with correct username and password.")
        
      },
      (error: any) => {
        if (error.ok == false) {
          this.loader = false;
          window.location.href = '/error';
      }
    }
    
  );
}
}
