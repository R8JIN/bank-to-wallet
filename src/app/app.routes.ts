import { Routes } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';
import { StatementComponent } from './statement/statement.component';
import { HomeComponent } from './home/home.component';
import { TransferLogComponent } from './transfer-log/transfer-log.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

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
      },
      {
        path:'profile',
        component: ProfileComponent,
        title: 'Profile'
      },
      {
        path:'admin/user-list',
        // component: UserDetailComponent,
        loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent),
        title: 'User List',
        // canActivate: [AuthGuard]
      }
];
