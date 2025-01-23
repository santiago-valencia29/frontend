import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducer';
import { environment } from './../../environments/environment';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

//                        TASK MONGO DB                    //

export class TaskService {

    private url = environment.apiUrlMsTask;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient, private store: Store<AppState>) {

    }

    saveTask(task: Task) {
        return this.http.post(`${this.url}create`, task, {headers: this.headers});
    }

    putTask(idMongo: string, task: Task) {
        return this.http.put(`${this.url}update?taskID=${idMongo}`, task, {headers: this.headers});
    }

    getTasksPending(userId) {
        return this.http.get(`${this.url}pending?userID=${userId}`, {headers: this.headers});
    }

    getTasksComplete(userId) {
        return this.http.get(`${this.url}complete?userID=${userId}`, {headers: this.headers});
    }

    getTasksHigh(userId) {
        return this.http.get(`${this.url}high?userID=${userId}`, {headers: this.headers});
    }

    getTasksMean(userId) {
        return this.http.get(`${this.url}mean?userID=${userId}`, {headers: this.headers});
    }

    getTasksLow(userId) {
        return this.http.get(`${this.url}low?userID=${userId}`, {headers: this.headers});
    }

    deleteTask(idTask) {
        return this.http.delete(`${this.url}delete?taskID=${idTask}`, {headers: this.headers});
    }

}
