
import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    login: reducers.AuthState;
    action: reducers.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    login: reducers.authReducer,
    action: reducers.userReducer
};

