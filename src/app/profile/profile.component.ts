import { Component, inject } from '@angular/core';
import { LocalService } from '../services/local/local.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotAuthorizeComponent } from '../not-authorize/not-authorize.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NotAuthorizeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  localService = inject(LocalService);
  email = '';
  username = '';
  auth_token = '';

  constructor() {
    this.email = this.localService.getData("email");
    this.username = this.localService.getData("username");
    this.auth_token = this.localService.getData("token");
  }
}
