import { Component, OnInit, Inject, AfterViewChecked, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { SwalConfig } from '../config-swal-alert';
import Swal from 'sweetalert2';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/task.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSetUserAction } from 'src/app/store/actions';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-modal-edit-task',
  templateUrl: './modal-edit-task.component.html',
  styleUrls: ['./modal-edit-task.component.sass']
})
export class ModalEditTaskComponent implements OnInit,OnDestroy {
  states = [{ id: 'pendiente', name: 'pendiente' }, { id: 'completada', name: 'completada' }];
  prioritys = [{ id: 'baja', name: 'baja' }, { id: 'media', name: 'media' }, { id: 'alta', name: 'alta' }];
  userId;
  matcher = new MyErrorStateMatcher();
  taskFormGroup: FormGroup;
  showActionButton: boolean;
  task: Task;
  loginSubscription: Subscription;
  saveSubscription: Subscription;
  updateSubscription: Subscription;



  constructor(private IformBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ModalEditTaskComponent>,
              private store: Store<AppState>,
              private ItaskService: TaskService,
              public datepipe: DatePipe,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: [Task, boolean]) {
              this.showActionButton = data[1];

  }

  ngOnInit(): void {
    this.loginSubscription = this.store.select('login')
      .subscribe(login => {
        if (login.user) {
          this.userId = login.user[0].payload.sub;
        }
      });
    if (this.data[0] != null) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  ngOnDestroy(){
    if (this.saveSubscription){
      this.saveSubscription.unsubscribe();
    }
    if (this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
    if (this.updateSubscription){
      this.updateSubscription.unsubscribe();
    }
  }

  createForm() {
    this.taskFormGroup = this.IformBuilder.group({
      idMongo: new FormControl({ value: '', disabled: true }),
      user: [this.userId, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      description: [''],
      state: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      dueDate: ['', [Validators.required]]
    });
  }

  updateForm() {
    const date = this.datepipe.transform(this.data[0].dueDate, 'yyyy-MM-dd');
    this.taskFormGroup = this.IformBuilder.group({
      _id: [this.data[0]._id, [Validators.required]],
      user: [this.userId, [Validators.required]],
      name: [this.data[0].name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      description: [this.data[0].description],
      state: [this.data[0].state, [Validators.required]],
      priority: [this.data[0].priority, [Validators.required]],
      dueDate: [date, [Validators.required]]
    });
  }

  saveTask() {
    let alert: {};
    if (this.taskFormGroup.invalid) {
      alert = SwalConfig.warningCampos;
      Swal.fire(alert);
      return;
    }
    alert = SwalConfig.loadingDesign;
    Swal.fire(alert);
    Swal.showLoading();

    this.task = this.taskFormGroup.value;
    this.saveSubscription = this.ItaskService.saveTask(this.task).subscribe(
      resp => {
        Swal.close();
        alert = SwalConfig.createTask;
        Swal.fire(alert);
        this.dialogRef.close(true);
        this.store.dispatch(new ActionSetUserAction ('save'));
      }, err => {
        Swal.close();
        const alertErrorRegister: {} = SwalConfig.errorRegister;
        Swal.fire(alertErrorRegister);
      });
  }

  updateTask() {
    let alert: {};
    if (this.taskFormGroup.invalid) {
      alert = SwalConfig.warningCampos;
      Swal.fire(alert);
      return;
    }
    alert = SwalConfig.loadingDesign;
    Swal.fire(alert);
    Swal.showLoading();
    this.task = this.taskFormGroup.value;
    this.updateSubscription = this.ItaskService.putTask(this.data[0]._id, this.task).subscribe(
      resp => {
        Swal.close();
        alert = SwalConfig.updateTask;
        Swal.fire(alert);
        this.store.dispatch(new ActionSetUserAction ('update'));
        this.dialogRef.close(true);
      }, err => {
        Swal.close();
        const alertErrorRegister: {} = SwalConfig.errorRegister;
        Swal.fire(alertErrorRegister);
      });

  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
