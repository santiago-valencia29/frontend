import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { SwalConfig } from 'src/app/shared/config-swal-alert';
import Swal from 'sweetalert2';
import { ActionSetUserAction } from 'src/app/store/actions';
import { ModalEditTaskComponent } from 'src/app/shared/modal-edit-task/modal-edit-task.component';

@Component({
  selector: 'app-low-task',
  templateUrl: './low-task.component.html',
  styleUrls: ['./low-task.component.sass']
})
export class LowTaskComponent implements OnInit, OnDestroy {

  userId;
  tasks: Task[];
  loadingTasks = true;
  actionSubscription: Subscription;
  loginSubscription: Subscription;
  getTasksSubscription: Subscription;
  deleteTaskSubscription: Subscription;
  notData: boolean;


  constructor(public dialog: MatDialog,
              private ItaskService: TaskService,
              private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getTasksLow();
    this.actionSubscription = this.store.select('action')
      .subscribe(resp => {
        this.getTasksLow();
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

  getTasksLow() {
    let alert: {};
    this.getTasksSubscription = this.ItaskService.getTasksLow(this.userId).subscribe(
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
          this.getTasksLow();
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
