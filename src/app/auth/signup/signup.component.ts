import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SwalConfig } from 'src/app/shared/config-swal-alert';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {
  hide = true;
  matcher = new MyErrorStateMatcher();
  registerFormGroup: FormGroup;
  user: User;
  isauthSubscription: Subscription;


  constructor(private router: Router, private IformBuilder: FormBuilder, private Iauth: AuthService) { }

  ngOnInit(): void {
   this.createForm();
  }

  ngOnDestroy(){
    if (this.isauthSubscription){
      this.isauthSubscription.unsubscribe();
    }
  }

  createForm(){
    this.registerFormGroup = this.IformBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  signUp(){
    let alert: {};
    if (this.registerFormGroup.invalid) {
      alert = SwalConfig.warningCampos;
      Swal.fire(alert);
      return;
    }
    alert = SwalConfig.loadingDesign;
    Swal.fire(alert);
    Swal.showLoading();

    this.user = this.registerFormGroup.value;
    this.isauthSubscription = this.Iauth.register(this.user).subscribe(resp => {
      Swal.close();
      alert = SwalConfig.createRegister;
      Swal.fire(alert);
      this.router.navigateByUrl('/sesion');
    }, err => {
      Swal.close();
      const alertErrorRegister: {} = SwalConfig.errorRegister;
      Swal.fire(alertErrorRegister);
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
