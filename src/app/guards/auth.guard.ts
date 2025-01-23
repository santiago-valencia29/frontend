import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { SwalConfig } from '../shared/config-swal-alert';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.auth.IsAuth()) {
      return true;
    } else {
      const alert: {} = SwalConfig.restringeSite;
      Swal.fire(alert);
      this.router.navigateByUrl('/sesion');
      // this.auth.logout();
      // localStorage.removeItem('email');
      return false;
    }
  }

}
