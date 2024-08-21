import { Component, ErrorHandler} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BankComponent } from './bank/bank.component';
import { CommonModule } from '@angular/common';
import { AdsComponent } from './ads/ads.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, AuthComponent, BankComponent, AdsComponent, UserDetailComponent],
  providers: [
   
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bank-to-wallet';
}


