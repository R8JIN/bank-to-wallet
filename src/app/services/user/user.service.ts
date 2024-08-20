import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  getUserDetail(id:any): Observable<any>{
    const auth_token = this.localService.getData("token");
    const header =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
    });

    return this.http.get(`${this.apiUrl}/${id}`, {headers:header})
  }

  assignNewRole(id:any, role:any): Observable<any>{

    const auth_token = this.localService.getData("token");
    const header =new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
    });

    const body ={
      'role': role
    }

    return this.http.patch(`${this.apiUrl}/assign-role?userId=${id}`,JSON.stringify(body) ,{headers:header})
  }

  removeOldRole(id:any, role:any): Observable<any>{

    const auth_token = this.localService.getData("token");
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = {
      'role': role
    }
    const req = new HttpRequest('DELETE', `${this.apiUrl}/remove-role?userId=${id}`, body, {
      headers: header

    })

    console.log("The request log is", req);
    return this.http.request(req);
  }
}
