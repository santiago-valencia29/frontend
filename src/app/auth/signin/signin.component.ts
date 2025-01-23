import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { ErrorStateMatcher } from '@angular/material/core';
import { SwalConfig } from '../../shared/config-swal-alert';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit, OnDestroy {

  hide = true;
  loginFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  user: User;
  isauthSubscription: Subscription;

  constructor(private router: Router, private IformBuilder: FormBuilder, private Iauth: AuthService) { }

  ngOnInit(): void {
    this.sesionVisiteLogin();
    this.createform();
  }
  ngOnDestroy(){
    if (this.isauthSubscription){
      this.isauthSubscription.unsubscribe();
    }
  }

  createform() {
    this.loginFormGroup = this.IformBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }

  signIn() {
    let alert: {};
    if (this.loginFormGroup.invalid) {
      alert = SwalConfig.warningCampos;
      Swal.fire(alert);
      return;
    }
    alert = SwalConfig.loadingDesign;
    Swal.fire(alert);
    Swal.showLoading();

    this.user = this.loginFormGroup.value;
    this.isauthSubscription = this.Iauth.login(this.user).subscribe(resp => {
      Swal.close();
      this.router.navigateByUrl('/mostrar-tareas');
    }, err => {
      Swal.close();
      const alert2: {} = SwalConfig.errorAuth;
      Swal.fire(alert2);
    });
  }

  sesionVisiteLogin(){
    const alert: {} = SwalConfig.siteLogin;
    if (!!localStorage.getItem('userTask')) {
      Swal.fire(alert).then((result) => {
        if (result.value) {
          this.Iauth.logout();
        }

      });
    }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
