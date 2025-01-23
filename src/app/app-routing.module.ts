import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagNotFoundComponent } from './shared/pag-not-found/pag-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ShowTasksComponent } from './components/task-state/show-tasks/show-tasks.component';
import { CompleteTasksComponent } from './components/task-state/complete-tasks/complete-tasks.component';
import { HighTaskComponent } from './components/task-state/high-task/high-task.component';
import { MeanTaskComponent } from './components/task-state/mean-task/mean-task.component';
import { LowTaskComponent } from './components/task-state/low-task/low-task.component';
import { AuthGuard } from './guards/auth.guard';
import { OverdueTasksComponent } from './components/task-state/overdue-tasks/overdue-tasks.component';

const routes: Routes = [
  { path: 'tareas-bajas', component: LowTaskComponent, canActivate: [AuthGuard] },
  { path: 'tareas-medias', component: MeanTaskComponent, canActivate: [AuthGuard] },
  { path: 'tareas-altas', component: HighTaskComponent, canActivate: [AuthGuard] },
  { path: 'tareas-completas', component: CompleteTasksComponent, canActivate: [AuthGuard] },
  { path: 'tareas-vencidas', component: OverdueTasksComponent, canActivate: [AuthGuard] },
  { path: 'mostrar-tareas', component: ShowTasksComponent, canActivate: [AuthGuard] },
  { path: 'pag-not-found', component: PagNotFoundComponent },
  { path: 'registro', component: SignupComponent },
  { path: 'sesion', component: SigninComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pag-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
