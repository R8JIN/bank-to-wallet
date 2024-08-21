import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    if(error.status == 400){
      console.error("Bad request.");
      this.showError("Bad Request");
    }
    else if(error.status == 408){
      console.error("Jwt token expired");
      this.showError("JWT token expired");
    }
    }

    showSuccess(msg:string) {
      // this.toastr.success(msg);
    }
  
    showError(msg:string){
      // this.toastr.error(msg);
    }
}
