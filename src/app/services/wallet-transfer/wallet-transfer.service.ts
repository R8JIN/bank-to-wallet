import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class WalletTransferService {
 
  apiUrl = "http://localhost:8080/api/digital-wallet"
  constructor(private http:HttpClient) { }

  bankToWallet(amount:any, recipientId:any, remarks:any, digitalWallet:any, username:string, auth_token:any):Observable<any>{
      
      console.log("The token is", auth_token);
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });
      const body = { 
        'amount':amount, 
        'recipientId':recipientId, 
        'remarks': remarks, 
        'digitalWallet':digitalWallet, 
        'username': username
      };
      
    return this.http.post<any>(this.apiUrl, JSON.stringify(body),  {headers: header});
  }

  walletLog(username:any, auth_token:any):Observable<any>{

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(this.apiUrl+"/user-statement?username="+username, {headers:header});
  }
}
