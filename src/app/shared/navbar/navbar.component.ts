import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ModalEditTaskComponent } from '../modal-edit-task/modal-edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { SwalConfig } from '../config-swal-alert';
import { Task } from 'src/app/models/task.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {

  mode = new FormControl('over');
  showNavbar: boolean;
  user;
  userId;
  tasks: Task[] = [];
  tasksAlarmDate: Task[];
  countAlarm = 0;
  actionSubscription: Subscription;
  loginSubscription: Subscription;


  constructor(private router: Router,
              private Iauth: AuthService,
              public dialog: MatDialog,
              private store: Store<AppState>,
              private ItaskService: TaskService) { }

  ngOnInit(): void {

    this.actionSubscription = this.store.select('action')
      .subscribe(resp => {
        this.getTasksPending();
      });

    this.loginSubscription = this.store.select('login')
      .subscribe(login => {
        if (login.user !== null) {
          this.showNavbar = true;
          this.user = login.user[0].payload.name;
          this.userId = login.user[0].payload.sub;
          this.getTasksPending();

        } else {
          this.showNavbar = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.actionSubscription){
      this.actionSubscription.unsubscribe();
    }
    if (this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }

  alarmDateArray() {
    this.countAlarm = 0;
    this.tasksAlarmDate = [];
    this.tasks.forEach((element) => {
      const hoy = new Date().getTime();
      const dueDate = new Date(element.dueDate).getTime();
      const diff = dueDate - hoy;
      const days = diff / (1000 * 60 * 60 * 24);
      if (days > 0.02 && days < 5) { // 4 dias Alarma
        this.tasksAlarmDate.push(element);
      }
      this.countAlarm = this.tasksAlarmDate.length;
    });
  }


  getTasksPending() {
    let alert: {} = SwalConfig.loadingDesign;
    this.ItaskService.getTasksPending(this.userId).subscribe(
      (resp: any) => {
        if (resp.tasks) {
          this.tasks = resp.tasks;
          this.alarmDateArray();
        }
      }, error => {
        // alert = SwalConfig.errorConexion;
        // Swal.fire(alert).then((result) => {
        //   Swal.showLoading();
        //   this.ngOnInit();
        // });
      });
  }

  logout() {
    this.Iauth.logout();
  }


  openModal(row, flagShowButton) {
    const dialogRef = this.dialog.open(ModalEditTaskComponent, {
      width: '700px',
      height: '500px',
      data: [row, flagShowButton]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        return;
      } else
        if (result !== false) {
          return;
        }
    });
  }
}
