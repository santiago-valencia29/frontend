import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.reducer';
import { SetUserAction, UnsetUserAction } from 'src/app/store/actions';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

//                        AUTH MONGO DB                    //

export class AuthService {

    private url = environment.apiUrlMsAuth;

    constructor(private http: HttpClient, private store: Store<AppState>, private router: Router) {

    }

    login(user: User) {
        return this.http.post(`${this.url}signin`, user)
            .pipe(
                map((resp: { any }) => {
                    this.store.dispatch(new SetUserAction(resp));
                    return resp;
                })
            );
    }

    register(user: User) {
        return this.http.post(`${this.url}signup`, user);
    }

    IsAuth(): boolean {
        this.store.select('login')
            .subscribe(login => {
                if (login.user) {
                    localStorage.setItem('userTask', JSON.stringify(login.user));
                }
            });
        if (!!localStorage.getItem('userTask')) {
            const sesion = JSON.parse(localStorage.getItem('userTask'));
            this.store.dispatch(new SetUserAction(sesion[0]));
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('userTask');
        this.store.dispatch(new UnsetUserAction());
        this.router.navigate(['/sesion']);
    }
}
