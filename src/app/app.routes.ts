import { Routes } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';
import { StatementComponent } from './statement/statement.component';
import { HomeComponent } from './home/home.component';
import { TransferLogComponent } from './transfer-log/transfer-log.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
      },
      {
        path: 'wallet-transfer',
        component: WalletTransferComponent,
        title: 'Wallet Transfer',
      },
      {
        path:'transfer-statement',
        component: StatementComponent,
        title: 'Transfer Statement'
      },
      {
        path:'wallet-statements',
        component: TransferLogComponent,
        title: 'Wallet Statements'
      }
];
