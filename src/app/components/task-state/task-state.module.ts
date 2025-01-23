import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { ShowTasksComponent } from './show-tasks/show-tasks.component';
import { CompleteTasksComponent } from './complete-tasks/complete-tasks.component';
import { HighTaskComponent } from './high-task/high-task.component';
import { MeanTaskComponent } from './mean-task/mean-task.component';
import { LowTaskComponent } from './low-task/low-task.component';
import { OverdueTasksComponent } from './overdue-tasks/overdue-tasks.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
  ShowTasksComponent,
  CompleteTasksComponent,
  HighTaskComponent,
  MeanTaskComponent,
  LowTaskComponent,
  OverdueTasksComponent
],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ShowTasksComponent,
    CompleteTasksComponent,
    HighTaskComponent,
    MeanTaskComponent,
    LowTaskComponent,
    OverdueTasksComponent
  ],
  providers:[DatePipe]
})
export class TaskStateModule { }
