import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditTaskComponent } from 'src/app/shared/modal-edit-task/modal-edit-task.component';
import { TaskService } from 'src/app/services/task.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import Swal from 'sweetalert2';
import { SwalConfig } from '../../../shared/config-swal-alert';
import { Task } from 'src/app/models/task.model';
import { ActionSetUserAction } from 'src/app/store/actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.sass']
})
export class ShowTasksComponent implements OnInit, OnDestroy {

  userId;
  tasks: Task[];
  loadingTasks = true;
  notData: boolean;
  actionSubscription: Subscription;
  loginSubscription: Subscription;
  getTasksSubscription: Subscription;
  deleteTaskSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private ItaskService: TaskService,
              private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getTasksPending();
    this.actionSubscription = this.store.select('action')
      .subscribe(resp => {
        this.getTasksPending();
      });
  }

  ngOnDestroy(){
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.getTasksSubscription) {
      this.getTasksSubscription.unsubscribe();
    }
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
  }

  public trackItem(index: number, item: Task) {
    return item._id;
  }

  getUserId() {
    this.loginSubscription = this.store.select('login')
      .subscribe(login => {
        if (login.user) {
          this.userId = login.user[0].payload.sub;
        }
      });
  }

  getTasksPending() {
    let alert: {};
    this.getTasksSubscription = this.ItaskService.getTasksPending(this.userId).subscribe(
      (resp: any) => {
        if (resp.tasks) {
          this.tasks = resp.tasks;
          this.loadingTasks = false;
          if (this.tasks.length === 0){
            this.notData = true;
          } else{
            this.notData = false;
          }
        }
      }, error => {
        alert = SwalConfig.errorConexion;
        Swal.fire(alert).then((result) => {
          Swal.showLoading();
          this.ngOnInit();
        });
      });
  }

  deleteTask(idTask: string) {
    let alert: {} = SwalConfig.deleteTask;
    Swal.fire(alert).then(resp => {
      if (resp.value) {
        this.deleteTaskSubscription = this.ItaskService.deleteTask(idTask).subscribe(() => {
          this.store.dispatch(new ActionSetUserAction ('delete'));
          setTimeout(() => {
            alert = SwalConfig.deleteTaskSuccess;
            Swal.fire(alert);
          }, 800);
        }, error => {
          alert = SwalConfig.errorConexion;
          Swal.fire(alert);
        });
      }
    });
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
