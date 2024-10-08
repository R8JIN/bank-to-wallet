import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

import { CommonModule } from '@angular/common';

import { LocalService } from '../../services/local/local.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotAuthorizeComponent } from '../../not-authorize/not-authorize.component';
import { Router } from '@angular/router';
import { HighlightDirective } from '../../attributes/highlight.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, NotAuthorizeComponent, HighlightDirective],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent{

  data:any = [];
  userService = inject(UserService)
  localService = inject(LocalService);
  auth_token!:string;
  user_role:any;

  constructor(private router:Router, 
              private http:HttpClient, 
              private toastr:ToastrService){

    this.auth_token =  this.localService.getData("token") || "";
    this.user_role= new Map([
      ["ROLE_ADMIN", "Admin"],
      ["ROLE_MODERATOR", "Moderator"],
      ["ROLE_USER", "User"]
    ]);
  
    console.log("The auth token from constructor", this.auth_token);
  
  }

  ngOnInit(){
    const header =new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    });
    this.http.get("http://localhost:8080/api/v1/client", {headers:header}).subscribe(
      (response:any)=>{
        
        if(response?.status==408){
          this.showError('User session expired.');
        }
        if(response?.data && response.success==true){
          console.log("The response from the server is", response);
          this.data = response.data;
        }
        console.log("The response from the server is", response);


      },
      error=>{
        if(error.status == 408){
          // console.error('User session expired');
          this.showError('User session expired.');
          
        }
        else{
          this.showError("You are unauthorized to access the page");

        }

      }
    )
    
  }


  getAll(){
    console.log("The ngOnInit");
    this.userService.getAllUser(this.auth_token).subscribe((response)=>{
      this.data = response.data
      console.log("The data", this.data);
    },
    error => {
      console.log("The error is", error );
    })
  }

  userDetails(id:string){
    this.router.navigate([`/admin/user-list/${id}`]);
  }

  showSuccess(msg:string) {
    this.toastr.success(msg);
  }

  showError(msg:string){
    this.toastr.error(msg);
  }
}
