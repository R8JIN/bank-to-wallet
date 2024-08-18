import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl ="http://localhost:8080/api/v1/client"
  constructor(private http: HttpClient, private localService:LocalService) { }

  getAllUser(auth_token:string):Observable<any>{
    // const auth_token = this.localService.getData("token");
    const header =new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    this.http.get(this.apiUrl, {headers:header}).subscribe(
      (response:any)=>{
        if(response?.data && response){
          console.log("The response from the server is", response);
        }
      }
    )
    return this.http.get(this.apiUrl, {headers:header} );
  }
}
