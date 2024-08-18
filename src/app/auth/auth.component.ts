import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { parse } from 'path';
import { LocalService } from '../services/local/local.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,

  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  parsedJSON: any;
  authService = inject(AuthService);
  localService = inject(LocalService);
  username = '';
  not_login = true;
  user_login = false;
  // toastr: any;

  constructor(private toastr: ToastrService, private router: Router){
    this.username = this.localService.getData("username") || "";
    console.log("From local storage ", this.username);

    if(this.username){
      this.not_login = false;
      this.user_login = true;
      console.log(this.not_login);
    }
    console.log(this.username);
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login(){

    if(this.loginForm.valid){

      console.log("The username is ", this.loginForm.value.username);
      this.authService.login(this.loginForm.value.username, 
        this.loginForm.value.password).subscribe(
      response => {

        
        console.log("The response is ", response.token );
        
        this.localService.saveData("token", String(response.token));
        this.localService.saveData("username", String(response.username));
        this.localService.saveData("email", String(response.email));
        
        this.not_login = false;
        this.username = this.localService.getData("username");
        this.loginForm.reset(); 
        this.router.navigate(["/"]);

        this.showSuccess("Login Successful");
    
      },
      error => {
        
        if(error.status === 401){
          console.error('Error submitting application', typeof(error.status));  
          this.showError('Bad Credentials. Please enter valid username or password.');
        }
        else{
          this.showError("You are unauthorized to access the page");
        }

      }
      ); 
    }
    else{
      console.log("Error");
      this.showError("Please fill the user form");
    }

  }

  logout(){
    this.localService.clearData();
    this.not_login=true;
    this.username = this.localService.getData("username") || "";
    this.router.navigate(["/"]);
    this.showError("See you !!!");
 
  }


  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  showError(msg:string){
    this.toastr.error(msg);
  }
}
