import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AdsComponent } from '../ads/ads.component';
import { CommonModule } from '@angular/common';
import { BankComponent } from '../bank/bank.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthComponent, AdsComponent, BankComponent,  CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
