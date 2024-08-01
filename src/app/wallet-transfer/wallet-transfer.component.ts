import { Component, inject } from '@angular/core';
import { WalletTransferService } from '../services/wallet-transfer/wallet-transfer.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalService } from '../services/local/local.service';
import { Router } from '@angular/router';
import { StatementComponent } from '../statement/statement.component';
import { Observable } from 'rxjs';
import { stat } from 'node:fs';
import { CustomColorDirective } from '../attributes/custom-color.directive';
import { FormMessageComponent } from '../form-message/form-message.component';
import { TransferLogComponent } from '../transfer-log/transfer-log.component';

@Component({
  selector: 'app-wallet-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, 
    StatementComponent, FormMessageComponent, CustomColorDirective, TransferLogComponent],
  templateUrl: './wallet-transfer.component.html',
  styleUrl: './wallet-transfer.component.css'
})
export class WalletTransferComponent {

  successMessage: string = '';
  responseData: any;
  statement = false;

  localService = inject(LocalService);
  walletTransferService = inject(WalletTransferService);

  errorMessage: string = '';

  constructor(private router:Router){

  }

  transferForm = new FormGroup(
    {
      amount: new FormControl(0, Validators.required),
      remarks: new FormControl('', Validators.required),
      recipientId: new FormControl('', Validators.required),
      digitalWallet: new FormControl('', Validators.required)
    }
  );

  transferToWallet(){

    if(this.transferForm.valid){

      const  data = this.transferForm.value;
      this.walletTransferService
      .bankToWallet(data.amount, data.recipientId, data.remarks, data.digitalWallet, this.localService.getData("username"), this.localService.getData('token') )
      .subscribe( response => {

          this.transferForm.reset();

          this.statement = true;
          this.responseData = response.data;

          this.setSuccessMessage(response.message);
          setTimeout(()=> this.successMessage='', 3000);

        },
        error => {
          console.error('Error submitting application', error);  
          this.setErrorMessage(error.error.message);
          setTimeout(()=>this.errorMessage='',3000);
        }
        ); 
     }
     else{
      console.error("Form Invalid");
      this.setErrorMessage("Form Invalid");     
      setTimeout(() => this.errorMessage='', 3000);
     }
  }

  handleEvent(statement: boolean) {
    this.statement = statement;
  }
  
  setSuccessMessage(message:string){
    this.successMessage = message;
    
  }

  setErrorMessage(message:string){
    this.errorMessage = message;
  }
}
