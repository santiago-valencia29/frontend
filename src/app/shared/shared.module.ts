import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppMaterialModule } from 'src/app/app-material.module';
import { FooterComponent } from './footer/footer.component';
import { ModalEditTaskComponent } from './modal-edit-task/modal-edit-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagNotFoundComponent } from './pag-not-found/pag-not-found.component';


@NgModule({
  declarations: [
    FooterComponent,
    ModalEditTaskComponent,
    NavbarComponent,
    PagNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    ModalEditTaskComponent,
    NavbarComponent,
    PagNotFoundComponent
  ], providers:[DatePipe]
})
export class SharedModule { }
