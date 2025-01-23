import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
 ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
