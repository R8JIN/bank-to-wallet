
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalService } from '../services/local/local.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localService: LocalService, private router: Router) {}

  canActivate(): boolean {

    if (this.localService.getData("roles").includes("ROLE_ADMIN")) {
      return true;
    } else {
      this.router.navigate(['/not-authorize']);
      return false;
    }
  }
}

