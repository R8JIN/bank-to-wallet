import { Component, inject } from '@angular/core';
import { WalletTransferService } from '../services/wallet-transfer/wallet-transfer.service';
import { LocalService } from '../services/local/local.service';
import { error } from 'console';
import { HighlightDirective } from '../attributes/highlight.directive';
import { CommonModule } from '@angular/common';
import { StatementComponent } from '../statement/statement.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-transfer-log',
  standalone: true,
  imports: [HighlightDirective, CommonModule, StatementComponent, NgxPaginationModule],
  templateUrl: './transfer-log.component.html',
  styleUrl: './transfer-log.component.css'
})
export class TransferLogComponent {

  walletTransferService = inject(WalletTransferService);
  localService = inject(LocalService);
  auth_token: string = '';
  username = '';
  statement: any;
  data: any;
  dataList:any = [];
  p: number = 1;

  constructor(){
    this.auth_token = this.localService.getData('token');
    this.username = this.localService.getData('username');
    this.walletTransferService.walletLog(this.username, this.auth_token).subscribe(
      response=>{
        for (let i = response.data.length-1; i >= 0; i--) {
          this.dataList.push(response.data[i]);
        }
        console.log("Data ", this.dataList);

      }, error =>{
        console.log(error);
      });
  }

  getWalletLog(){

  }

  handleEvent(statement: boolean) {
    this.statement = statement;
  }

  setData(data:any){
    this.data= data;
    this.statement = true;
    console.log("the data is", data);
  }
}
